/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import {
  questionSetsLoadFailure,
  questionSetsLoadStart,
  questionSetsLoadSuccess,
  questionSetsSettle,
} from "@/store/slices/question-sets.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import OrganizationQuestionSets from "@/components/OrganizationQuestionSets";
import { QuestionSetInterface } from "@/lib/types";
import React from "react";
import { privateAxios } from "@/lib/api";

export default function QuestionSetsPage() {
  const organizationId = useParams<{ organizationId: string }>().organizationId;
  const { questionSets } = useAppSelector((state) => state.questionSets);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const url = location.pathname.startsWith("/tanobora") ? "tanobora" : "quiz";

  const fetchQuestionSets = async () => {
    dispatch(questionSetsLoadStart());
    try {
      const data = (
        await privateAxios.get(
          `/${url}/organizations/${organizationId}/questionsets/`
        )
      ).data as Array<QuestionSetInterface>;
      // console.log({ data });

      dispatch(questionSetsLoadSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(questionSetsLoadFailure(JSON.stringify(error)));
    } finally {
      dispatch(questionSetsSettle());
    }
  };

  // const orgInfo = React.useMemo(() => {
  //   return organizations.find((org) => org.uid === organizationId);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.allSettled([fetchQuestionSets()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);
  // console.log({ organization, organizationId });
  const navigate = useNavigate();

  return (
    <div className="">
      <div className=" max-w-7xl mx-auto">
        {/* Header with back button and org image */}
        <div className="flex flex-row justify-between items-center h-fit p-2 my-1">
          <div className="flex flex-row gap-4 items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-primary text-white rounded-md px-4 text-center"
            >
              Back
            </button>

            {/* <h1 className="text-2xl font-bold">
              {organization?.organization_name}
            </h1> */}
          </div>

          <button
            onClick={() => navigate(`/quiz/${organizationId}/leaderboard`)}
            className="bg-primary text-white rounded-md px-4 py-2 text-center"
          >
            {/* {new Date().toLocaleString("default", { month: "long" })}{" "} */}
            Leaderboard
          </button>
        </div>
        {/* Organization questionsets */}
        <OrganizationQuestionSets
          questionSets={questionSets}
          organizationId={organizationId!}
        />
      </div>
    </div>
  );
}
