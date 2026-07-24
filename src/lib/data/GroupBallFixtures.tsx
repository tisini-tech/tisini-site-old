import { Fixture, GroupByDate, GroupedFixtures } from "../types/scores";

const GroupBallFixtures = (data: Fixture[]) => {
  const groupDataByDate = (data: Fixture[]) => {
    const groupedData: GroupByDate = {};

    data.forEach((item) => {
      const date = item.game_date.split(" ")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });

    return groupedData;
  };

  const groupDataByLeague = (data: GroupByDate) => {
    const groupedData: GroupedFixtures = {};

    for (const [key, value] of Object.entries(data)) {
      if (!groupedData[key]) {
        groupedData[key] = {};
      }

      value.forEach((item) => {
        const league = item.league;

        if (!groupedData[key][league]) {
          groupedData[key][league] = [];
        }

        groupedData[key][league].push(item);
      });
    }

    return groupedData;
  };

  const groupedData = groupDataByDate(data);
  const fixtures = groupDataByLeague(groupedData);
  // console.log(fixtures);

  return fixtures;
};

export default GroupBallFixtures;

// const GroupBallFixtures = (data: Record<string, Record<string, any>[]>) => {
//   const groupDataByDate = (data: Record<string, any[]>) => {
//     const groupedData: Record<string, any[]> = {};

//     data.forEach((item) => {
//       const date = item.game_date.split(" ")[0];
//       if (!groupedData[date]) {
//         groupedData[date] = [];
//       }
//       groupedData[date].push(item);
//     });

//     return groupedData;
//   };

//   const groupDataByLeague = (data: Record<string, Record<string, any[]>>) => {
//     const groupedData: Record<string, Record<string, any[]>> = {};

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

// export default GroupBallFixtures;
