// import { PredictiveLeaderBoard } from "./types";

export const sampleBoard = {
  leaderBoard: {
    uid: "921e6b9d-f508-431d-a10a-ba249f09de33",
    category_name: "Tisini Predictor",
    quiz_type: "PR",
    question_players: [
      {
        id: 37,
        q_player: {
          id: 1,
          nickname: "tisini_admin",
          first_name: "Tisini",
          last_name: "Admin",
          profile_pic:
            "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp",
        },
        questions: [
          {
            uid: "b245e730-9cce-4a00-8376-6810a3e0e35a",
            question_text: {
              uid: "340750eb-28d2-4f84-be90-7b9d0997753a",
              question_abbrev: {
                uid: "2b5cf8a9-0dc3-4b90-a9bf-b545935a983e",
                names: "Scrums",
              },
            },
            user_answers: [
              {
                uid: "1fad1bcc-45e5-422f-9534-9e3bfd7c3c63",
                answer_text: "4",
                answer_marker: null,
              },
            ],
          },
          {
            uid: "c5f4f26f-bad9-421f-bae1-bc915d3f4908",
            question_text: {
              uid: "6788bc5e-8273-4311-bf88-103e639a6a8f",
              question_abbrev: {
                uid: "f97bb5ed-86f8-4922-8230-a747f1ef1852",
                names: "Tackles",
              },
            },
            user_answers: [
              {
                uid: "dc173b83-37ff-49f2-89d0-69defabb28d0",
                answer_text: "10",
                answer_marker: null,
              },
            ],
          },
          {
            uid: "9c37cbd6-3cab-4da9-89fc-0c39d3828bba",
            question_text: {
              uid: "616ba83c-a291-4721-afab-71ee25653f27",
              question_abbrev: {
                uid: "f42b857d-62a9-4b33-b563-38e07f2bacce",
                names: "Carries",
              },
            },
            user_answers: [
              {
                uid: "4164c1cf-e24d-42b5-98cf-bff480bf8a61",
                answer_text: "11",
                answer_marker: null,
              },
            ],
          },
        ],
        points_earned: null,
        time_used: 3.4,
        score: 0,
      },
    ],
  },
};

export const payload2 = {
  "uid": "141cba1e-c893-4f7d-b82e-c1f6ba4b616d",
  "category_name": "Tisini Prediction Test",
  "quiz_type": "PR",
  "question_players": [
      {
          "id": 2,
          "q_player": {
              "id": 2,
              "nickname": "Briodev",
              "first_name": "Brian",
              "last_name": "Odhiambo"
          },
          "marked_useranswers": [
              {
                  "id": 6,
                  "question_abbrev": "Substitute",
                  "user_answer": "3",
                  "answer_marker": "IC"
              },
              {
                  "id": 7,
                  "question_abbrev": "Foul",
                  "user_answer": "7",
                  "answer_marker": "IW"
              },
              {
                  "id": 8,
                  "question_abbrev": "Corner",
                  "user_answer": "4",
                  "answer_marker": "IC"
              },
              {
                  "id": 9,
                  "question_abbrev": "Goal Kick",
                  "user_answer": "11",
                  "answer_marker": "IC"
              },
              {
                  "id": 10,
                  "question_abbrev": "Card",
                  "user_answer": "2",
                  "answer_marker": "IC"
              },
              {
                  "id": 11,
                  "question_abbrev": "Substitute",
                  "user_answer": "3",
                  "answer_marker": "IC"
              },
              {
                  "id": 12,
                  "question_abbrev": "Foul",
                  "user_answer": "7",
                  "answer_marker": "IW"
              },
              {
                  "id": 13,
                  "question_abbrev": "Corner",
                  "user_answer": "4",
                  "answer_marker": "IC"
              },
              {
                  "id": 14,
                  "question_abbrev": "Goal Kick",
                  "user_answer": "11",
                  "answer_marker": "IC"
              },
              {
                  "id": 15,
                  "question_abbrev": "Card",
                  "user_answer": "2",
                  "answer_marker": "IC"
              }
          ],
          "points_earned": 40,
          "time_used": 4.5
      },
      {
          "id": 5,
          "q_player": {
              "id": 3,
              "nickname": "tisini_admin",
              "first_name": "Tisini",
              "last_name": "Admin"
          },
          "marked_useranswers": [
              {
                  "id": 16,
                  "question_abbrev": "Substitute",
                  "user_answer": "3",
                  "answer_marker": "IC"
              },
              {
                  "id": 17,
                  "question_abbrev": "Foul",
                  "user_answer": "7",
                  "answer_marker": "IW"
              },
              {
                  "id": 18,
                  "question_abbrev": "Corner",
                  "user_answer": "4",
                  "answer_marker": "IC"
              },
              {
                  "id": 19,
                  "question_abbrev": "Goal Kick",
                  "user_answer": "11",
                  "answer_marker": "IC"
              },
              {
                  "id": 20,
                  "question_abbrev": "Card",
                  "user_answer": "3",
                  "answer_marker": "IW"
              }
          ],
          "points_earned": 30,
          "time_used": null
      }
  ]
}
export const leaderboard2Payload = {
  uid: "141cba1e-c893-4f7d-b82e-c1f6ba4b616d",
  category_name: "Tisini Prediction Test",
  quiz_type: "PR",
  question_players: [
    {
      id: 2,
      q_player: {
        id: 2,
        nickname: "Briodev",
        first_name: "Brian",
        last_name: "Odhiambo",
      },
      marked_useranswers: [
        {
          id: 6,
          question_abbrev: "Substitute",
          user_answer: "3",
          answer_marker: "IC",
        },
        {
          id: 7,
          question_abbrev: "Foul",
          user_answer: "7",
          answer_marker: "IW",
        },
        {
          id: 8,
          question_abbrev: "Corner",
          user_answer: "4",
          answer_marker: "IC",
        },
        {
          id: 9,
          question_abbrev: "Goal Kick",
          user_answer: "11",
          answer_marker: "IC",
        },
        {
          id: 10,
          question_abbrev: "Card",
          user_answer: "2",
          answer_marker: "IC",
        },
        {
          id: 11,
          question_abbrev: "Substitute",
          user_answer: "3",
          answer_marker: "IC",
        },
        {
          id: 12,
          question_abbrev: "Foul",
          user_answer: "7",
          answer_marker: "IW",
        },
        {
          id: 13,
          question_abbrev: "Corner",
          user_answer: "4",
          answer_marker: "IC",
        },
        {
          id: 14,
          question_abbrev: "Goal Kick",
          user_answer: "11",
          answer_marker: "IC",
        },
        {
          id: 15,
          question_abbrev: "Card",
          user_answer: "2",
          answer_marker: "IC",
        },
      ],
      points_earned: 40,
      time_used: 4.5,
    },
    {
      id: 5,
      q_player: {
        id: 3,
        nickname: "tisini_admin",
        first_name: "Tisini",
        last_name: "Admin",
      },
      marked_useranswers: [
        {
          id: 16,
          question_abbrev: "Substitute",
          user_answer: "3",
          answer_marker: "IC",
        },
        {
          id: 17,
          question_abbrev: "Foul",
          user_answer: "7",
          answer_marker: "IW",
        },
        {
          id: 18,
          question_abbrev: "Corner",
          user_answer: "4",
          answer_marker: "IC",
        },
        {
          id: 19,
          question_abbrev: "Goal Kick",
          user_answer: "11",
          answer_marker: "IC",
        },
        {
          id: 20,
          question_abbrev: "Card",
          user_answer: "3",
          answer_marker: "IW",
        },
      ],
      points_earned: 30,
      time_used: null,
    },
  ],
};