import GridLoader from "./GridLoader";
import { QuestionSetInterface } from "@/lib/types";
import QuestionSetTimerCard from "./QuestionSetTimerCard";
import { useAppSelector } from "@/store/hooks";

type QuestionSetProps = {
  questionSets: Array<QuestionSetInterface>;
  organizationId: string;
};
export default function OrganizationQuestionSets({
  questionSets,
  organizationId,
}: QuestionSetProps) {
  const { loading } = useAppSelector((state) => state.questionSets);
  return (
    <div className="py-2 px-4">
      {!loading && questionSets?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {questionSets.map((questionSet) => (
            <div
              key={questionSet.uid}
              className="border cursor-pointer shadow-sm hover:shadow-md rounded overflow-hidden"
              onClick={() => console.log("clicked")}
            >
              <h1 className="text-xl font-bold p-2">
                {questionSet.category_name}
              </h1>
              {/* image */}
              <div className="h-60 w-full">
                <img
                  src={questionSet.theme_image}
                  alt={questionSet.category_name}
                  width={500}
                  height={500}
                  className="object-cover h-full w-full"
                />
              </div>
              {/* <div className="flex flex-row gap-2">
                <p className="text-sm">
                  {questionSet.questions.length} questions
                </p>
                <p className="text-sm">
                  {questionSet.questions.length} responses
                </p>
              </div> */}
              <QuestionSetTimerCard
                questionSet={questionSet}
                organizationId={organizationId}
              />
            </div>
          ))}
        </div>
      ) : loading && questionSets.length < 1 ? (
        <GridLoader />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 min-h-[60vh]">
          <h1 className="text-xl font-bold">No question sets found</h1>
          <p className="text-sm">
            Create a question set to get started with your organization
          </p>
        </div>
      )}
    </div>
  );
}
