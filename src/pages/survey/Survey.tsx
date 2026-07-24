// components/SurveyPage.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { surveySchema } from "./surveyData";
import { Question, SurveyAnswer } from "@/lib/types/survey";
import kruLogo from "@/assets/tournaments/kru.png";
import tisiniLogo from "@/assets/img/tisini.png";
import { submitSurvey } from "@/lib/data/submitSurvey";
import { ToastContainer, toast } from "react-toastify";

const REFERRAL_QUESTION_ID = 1;
const REFERRAL_STORAGE_KEY = "tisini_survey_referral_code";

const SurveyPage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, any>>(() => {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
    return stored ? { [REFERRAL_QUESTION_ID]: stored } : {};
  });
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [otherInputs, setOtherInputs] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionInSection, setCurrentQuestionInSection] = useState(0);

  const [searchParams] = useSearchParams();
  const questionsMap = new Map(surveySchema.questions.map((q) => [q.id, q]));

  // Set referral from URL query param (?referral=CODE or ?ref=CODE); else localStorage; else default "tisini"
  useEffect(() => {
    const referralFromUrl =
      searchParams.get("referral")?.trim() ?? searchParams.get("ref")?.trim();
    if (referralFromUrl) {
      setAnswers((prev) => ({
        ...prev,
        [REFERRAL_QUESTION_ID]: referralFromUrl,
      }));
      localStorage.setItem(REFERRAL_STORAGE_KEY, referralFromUrl);
    } else if (!localStorage.getItem(REFERRAL_STORAGE_KEY)) {
      setAnswers((prev) => ({
        ...prev,
        [REFERRAL_QUESTION_ID]: "tisini",
      }));
      localStorage.setItem(REFERRAL_STORAGE_KEY, "tisini");
    }
  }, [searchParams]);

  // Reset question index when changing section
  useEffect(() => {
    setCurrentQuestionInSection(0);
  }, [currentSection]);

  const getQuestionsForSection = (sectionId: string): Question[] => {
    const section = surveySchema.sections.find((s) => s.id === sectionId);
    if (!section) return [];
    return section.questions
      .map((id) => questionsMap.get(id))
      .filter((q): q is Question => q !== undefined);
  };

  const shouldShowQuestion = (question: Question): boolean => {
    if (question.conditional) {
      const dependentAnswer = answers[question.conditional.dependsOn];
      return question.conditional.condition(dependentAnswer);
    }
    return true;
  };

  const currentSectionData = surveySchema.sections[currentSection];
  const currentQuestions = getQuestionsForSection(currentSectionData.id);
  const visibleQuestions = currentQuestions.filter(
    (q) => q && shouldShowQuestion(q),
  );
  const currentQuestion = visibleQuestions[currentQuestionInSection] ?? null;
  const isOnLastQuestionOfLastSection =
    currentSection === surveySchema.sections.length - 1 &&
    currentQuestionInSection === visibleQuestions.length - 1;

  useEffect(() => {
    const totalQuestions = surveySchema.questions.length;
    const answeredQuestions = Object.keys(answers).length;
    setProgress((answeredQuestions / totalQuestions) * 100);
  }, [answers]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error for this question
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleOtherInputChange = (questionId: number, value: string) => {
    setOtherInputs((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const validateContact = (
    value: string,
    fieldType: string,
  ): { valid: boolean; message?: string } => {
    const trimmed = value?.trim() ?? "";
    if (trimmed.length === 0) return { valid: true };
    if (fieldType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return { valid: false, message: "Please enter a valid email address" };
      }
    }
    if (fieldType === "tel" || fieldType === "phone") {
      const digitsOnly = trimmed.replace(/\D/g, "");
      if (digitsOnly.length < 9) {
        return { valid: false, message: "Please enter a valid phone number" };
      }
    }
    return { valid: true };
  };

  const validateQuestion = (question: Question, answer: any): boolean => {
    if (question.required) {
      if (answer === undefined || answer === null || answer === "") {
        setErrors((prev) => ({
          ...prev,
          [question.id]: "This question is required",
        }));
        return false;
      }

      if (Array.isArray(answer) && answer.length === 0) {
        setErrors((prev) => ({
          ...prev,
          [question.id]: "Please select at least one option",
        }));
        return false;
      }
    }

    if (question.type === "contact" && answer && question.fields) {
      for (const field of question.fields) {
        const value = answer[field.name];
        if (value === undefined || value === null) continue;
        const result = validateContact(value, field.type);
        if (!result.valid) {
          setErrors((prev) => ({
            ...prev,
            [question.id]: result.message ?? "Invalid input",
          }));
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    if (!validateQuestion(currentQuestion, answers[currentQuestion.id])) {
      return;
    }
    if (currentQuestionInSection < visibleQuestions.length - 1) {
      setCurrentQuestionInSection((i) => i + 1);
    } else if (currentSection < surveySchema.sections.length - 1) {
      setCurrentSection((s) => s + 1);
      setCurrentQuestionInSection(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    if (!currentQuestion || currentQuestion.required) return;
    if (currentQuestionInSection < visibleQuestions.length - 1) {
      setCurrentQuestionInSection((i) => i + 1);
    } else if (currentSection < surveySchema.sections.length - 1) {
      setCurrentSection((s) => s + 1);
      setCurrentQuestionInSection(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionInSection > 0) {
      setCurrentQuestionInSection((i) => i - 1);
    } else if (currentSection > 0) {
      const prevSection = surveySchema.sections[currentSection - 1];
      const prevVisible = getQuestionsForSection(prevSection.id).filter(
        (q) => q && shouldShowQuestion(q),
      );
      setCurrentSection((s) => s - 1);
      setCurrentQuestionInSection(prevVisible.length - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate all visible questions
    let isValid = true;
    surveySchema.questions.forEach((question) => {
      if (shouldShowQuestion(question)) {
        if (!validateQuestion(question, answers[question.id])) {
          isValid = false;
        }
      }
    });

    if (!isValid) {
      setIsSubmitting(false);
      toast.error("Please complete all required questions before submitting.");
      return;
    }

    try {
      // Format answers for submission
      const formattedAnswers: SurveyAnswer[] = Object.entries(answers).map(
        ([questionId, value]) => {
          const id = parseInt(questionId);
          const questionText =
            questionsMap.get(id)?.question ?? `Question ${id}`;
          return { question: questionText, value };
        },
      );

      // Merge "Other" text inputs into the corresponding answer
      Object.entries(otherInputs).forEach(([questionId, value]) => {
        const id = parseInt(questionId);
        const answer = answers[id];
        if (Array.isArray(answer) && answer.includes("Other")) {
          const questionText =
            questionsMap.get(id)?.question ?? `Question ${id}`;
          const entry = formattedAnswers.find(
            (a) => a.question === questionText,
          );
          if (entry) {
            entry.value = { selected: answer, other: value };
          } else {
            formattedAnswers.push({
              question: questionText,
              value: { selected: answer, other: value },
            });
          }
        }
      });

      console.log("Submitting answers:", formattedAnswers);

      // Simulate API call
      const response = await submitSurvey(formattedAnswers);

      if (response.error === "0") {
        setIsSubmitted(true);
        toast.success(response.message);
      } else {
        toast.error(response.message);
        setErrors((prev) => ({
          ...prev,
          submit: response.message,
        }));
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to submit survey. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    if (!shouldShowQuestion(question)) return null;

    switch (question.type) {
      case "text":
        return renderTextQuestion(question);
      case "number":
        return renderNumberQuestion(question);
      case "choice":
        return renderChoiceQuestion(question);
      case "contact":
        return renderContactQuestion(question);
      default:
        return null;
    }
  };

  const renderTextQuestion = (question: Question) => (
    <div className="space-y-2">
      {question.multiline ? (
        <textarea
          value={answers[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      ) : (
        <input
          type="text"
          value={answers[question.id] || ""}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );

  const renderNumberQuestion = (question: Question) => (
    <div className="space-y-2">
      <input
        type="number"
        value={answers[question.id] || ""}
        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
        placeholder={question.placeholder}
        min="0"
        max="120"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  const renderChoiceQuestion = (question: Question) => {
    const selectedValues =
      answers[question.id] || (question.multiple ? [] : "");

    const handleChoiceChange = (option: string) => {
      if (question.multiple) {
        const isRemoving = selectedValues.includes(option);
        const newSelection = isRemoving
          ? selectedValues.filter((v: string) => v !== option)
          : [...selectedValues, option];

        // Enforce maxSelections (count options excluding "None")
        const selectionWithoutNone = newSelection.filter(
          (v: string) => v !== "None",
        );
        const max = question.maxSelections ?? Infinity;
        if (
          !isRemoving &&
          max !== Infinity &&
          selectionWithoutNone.length > max
        ) {
          return; // Don't allow more than maxSelections
        }

        // Handle "None" selection
        if (option === "None" && !selectedValues.includes("None")) {
          handleAnswerChange(question.id, ["None"]);
        } else if (option !== "None" && selectedValues.includes("None")) {
          handleAnswerChange(question.id, [option]);
        } else {
          handleAnswerChange(question.id, newSelection);
        }
      } else {
        handleAnswerChange(question.id, option);
      }
    };

    const getLayoutClasses = () => {
      switch (question.layout) {
        case "horizontal":
          return "flex flex-wrap gap-4";
        case "grid":
          return "grid grid-cols-2 md:grid-cols-3 gap-3";
        default:
          return "space-y-2";
      }
    };

    const selectionWithoutNone = (
      question.multiple
        ? (selectedValues as string[]).filter((v) => v !== "None")
        : []
    ) as string[];
    const atMaxSelections =
      question.multiple &&
      question.maxSelections != null &&
      selectionWithoutNone.length >= question.maxSelections;
    const isOptionDisabled = (option: string) =>
      atMaxSelections && !selectedValues.includes(option) && option !== "None";

    return (
      <div className="space-y-3">
        <div className={getLayoutClasses()}>
          {question.options?.map((option) => (
            <label
              key={option}
              className={`
                flex items-center p-3 border rounded-lg transition-colors
                ${
                  isOptionDisabled(option)
                    ? "cursor-not-allowed opacity-60 border-gray-200 bg-gray-50"
                    : "cursor-pointer"
                }
                ${
                  !isOptionDisabled(option) &&
                  (question.multiple
                    ? selectedValues.includes(option)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                    : selectedValues === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50")
                }
              `}
            >
              <input
                type={question.multiple ? "checkbox" : "radio"}
                name={`question-${question.id}`}
                value={option}
                checked={
                  question.multiple
                    ? selectedValues.includes(option)
                    : selectedValues === option
                }
                disabled={isOptionDisabled(option)}
                onChange={() => handleChoiceChange(option)}
                className={`
                  ${question.multiple ? "rounded" : "rounded-full"}
                  w-4 h-4 text-blue-600 focus:ring-blue-500
                `}
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        {question.other && selectedValues.includes("Other") && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Please specify..."
              value={otherInputs[question.id] || ""}
              onChange={(e) =>
                handleOtherInputChange(question.id, e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {question.helpText && (
          <p className="text-sm text-gray-500 mt-1">{question.helpText}</p>
        )}
      </div>
    );
  };

  const renderContactQuestion = (question: Question) => (
    <div className="space-y-4">
      {question.fields?.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            value={answers[question.id]?.[field.name] || ""}
            onChange={(e) => {
              const currentContact = answers[question.id] || {};
              handleAnswerChange(question.id, {
                ...currentContact,
                [field.name]: e.target.value,
              });
            }}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ))}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your feedback has been submitted successfully. We appreciate your
            time and input!
          </p>

          {/* Quiz Invitation */}
          <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎯 Want to test your rugby knowledge?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Take our exciting rugby quiz and compete with other fans!
            </p>
            <a
              href="https://www.tisini.co.ke/quiz/RGeUh24Kiz2d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <span>Play Quiz Now</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" theme="light" />
      {/* Single wrapper so sticky header has correct scroll context */}
      <div className="max-w-5xl mx-auto">
        <div className="sticky top-0 z-10 bg-white rounded-t-xl shadow-sm">
          <div className="px-4 sm:px-5 py-4 sm:py-3 border-b">
            {/* KRU (left) | Tisini (right) — row on desktop, stacked on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-4">
              {/* Kenya Rugby Union */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden bg-white border border-gray-100 shadow-sm shrink-0">
                  <img
                    src={kruLogo}
                    alt="Kenya Rugby Union"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight line-clamp-2">
                    {surveySchema.metadata.title}
                  </h1>
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-1 hidden sm:block">
                    {surveySchema.metadata.description}
                  </p>
                </div>
              </div>

              {/* Powered by Tisini */}
              <div className="flex items-center justify-end sm:justify-center gap-2 shrink-0 self-end sm:self-auto">
                <span className="text-xs text-gray-400">Powered by</span>
                <div className="flex items-center bg-gray-50/90 rounded-lg border border-gray-100 shadow-sm">
                  <img
                    src={tisiniLogo}
                    alt="Tisini"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress + Section Navigation */}
          <div className="px-4 sm:px-5 py-3 border-b space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
              <span className="font-medium">Progress</span>
              <span className="text-red-600 font-semibold tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
              <div
                className="bg-red-600 h-2 sm:h-2.5 rounded-full transition-all duration-300 min-w-[2px]"
                style={{ width: `${Math.max(progress, 0)}%` }}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-0.5 px-0.5">
              {surveySchema.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`
                    px-4 py-2.5 sm:px-3 sm:py-1.5 text-xs sm:text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0
                    touch-manipulation
                    ${
                      currentSection === index
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 bg-gray-50/50"
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form content — one question at a time */}
        <div className="bg-white shadow-sm p-4 sm:p-6 rounded-b-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentSectionData.title}
            </h2>
            {visibleQuestions.length > 1 && (
              <span className="text-sm text-gray-500">
                Question {currentQuestionInSection + 1} of{" "}
                {visibleQuestions.length}
              </span>
            )}
          </div>

          {currentQuestion ? (
            <div className="space-y-4">
              <div className="flex items-start">
                <label className="block text-sm font-medium text-gray-700">
                  {currentQuestion.question}
                  {currentQuestion.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </label>
              </div>
              {currentQuestion.helpText &&
                currentQuestion.type !== "choice" && (
                  <p className="text-sm text-gray-500 mb-1">
                    {currentQuestion.helpText}
                  </p>
                )}

              {renderQuestion(currentQuestion)}

              {errors[currentQuestion.id] && (
                <p className="text-sm text-red-600 mt-1">
                  {errors[currentQuestion.id]}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No questions in this section.</p>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0 && currentQuestionInSection === 0}
              className={`
                px-6 py-2 rounded-lg font-medium transition-colors
                ${
                  currentSection === 0 && currentQuestionInSection === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentQuestion && !currentQuestion.required && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-6 py-2 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Skip
                </button>
              )}
              {isOnLastQuestionOfLastSection ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Survey"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Version {surveySchema.metadata.version}</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
