import { Fixture, GroupedFixtures } from "../types/scores";

const GroupRubgyFixtures = (data: Fixture[]): GroupedFixtures => {
  const groupedData: GroupedFixtures = {};

  data.forEach((item) => {
    const date = item.game_date.split(" ")[0]; // Extract the date without the time part
    if (!groupedData[date]) {
      groupedData[date] = {};
    }

    const league = item.league;
    const matchDay = item.matchday;

    const key = `${league} - ${matchDay}`;

    if (!groupedData[date][key]) {
      groupedData[date][key] = [];
    }

    groupedData[date][key].push(item);
  });

  return groupedData;
};

export default GroupRubgyFixtures;

// const GroupRubgyFixtures = (data: Fixture[]) => {
//   const groupDataByDate = (data: Fixture[]) => {
//     const groupedData: GroupByDate = {};

//     data.forEach((item) => {
//       const date = item.game_date.split(" ")[0]; // Extract the date without the time part
//       if (!groupedData[date]) {
//         groupedData[date] = [];
//       }
//       groupedData[date].push(item);
//     });

//     return groupedData;
//   };

//   const groupDataByLeague = (data: GroupByDate) => {
//     const groupedData: GroupedFixtures = {};

//     for (const [key, value] of Object.entries(data)) {
//       if (!groupedData[key]) {
//         groupedData[key] = {};
//       }

//       value.forEach((item) => {
//         const league = item.league;

//         if (!groupedData[key][league]) {
//           groupedData[key][league] = [];
//         }

//         groupedData[key][league].push(item);
//       });
//     }

//     return groupedData;
//   };

//   const groupedData = groupDataByDate(data);
//   const fixtures = groupDataByLeague(groupedData);

//   return fixtures;
// };

// const groupDataByDate = (data: Fixture[]) => {
//   const groupedData: GroupByDate = {};

//   data.forEach((item) => {
//     const date = item.game_date.split(" ")[0]; // Extract the date without the time part
//     if (!groupedData[date]) {
//       groupedData[date] = [];
//     }
//     groupedData[date].push(item);
//   });

//   return groupedData;
// };

// const groupDataByLeague = (data: GroupByDate) => {
//   const groupedData: GroupedFixtures = {};

//   for (const [key, value] of Object.entries(data)) {
//     if (!groupedData[key]) {
//       groupedData[key] = {};
//     }

//     value.forEach((item) => {
//       const league = item.league;

//       if (!groupedData[key][league]) {
//         groupedData[key][league] = [];
//       }

//       groupedData[key][league].push(item);
//     });
//   }

//   return groupedData;
// };
