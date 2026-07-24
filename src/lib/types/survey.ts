export type QuestionType = "text" | "number" | "choice" | "contact";

export interface ContactField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

export interface ConditionalLogic {
  dependsOn: number;
  condition: (answer: any) => boolean;
}

export interface SurveySection {
  id: string;
  title: string;
  questions: number[];
}

export interface SurveySchema {
  metadata: {
    title: string;
    description: string;
    version: string;
  };
  sections: SurveySection[];
  questions: Question[];
}

export interface SurveyAnswer {
  question: string;
  value:
    | string
    | string[]
    | { phone?: string; email?: string }
    | { selected: string[]; other: string };
}

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  multiple?: boolean;
  maxSelections?: number;
  placeholder?: string;
  multiline?: boolean;
  other?: boolean;
  layout?: "vertical" | "horizontal" | "grid";
  fields?: ContactField[];
  conditional?: ConditionalLogic;
  helpText?: string;
}
