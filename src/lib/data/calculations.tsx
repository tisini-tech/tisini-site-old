import { EventStats } from "../types/scores";

export const getStat = (arry: EventStats[], name: string) => {
  const event = Object.values(arry).find(
    (item) => item.event_name.toString() === name,
  );

  return Number(event?.total ?? 0);
};

export const getEvent = (array: EventStats[], eventId: string): number => {
  const event = Object.values(array).find(
    (item) => item.event_id.toString() === eventId,
  );

  return Number(event?.total ?? 0);
};

export const getSubEvent = (
  array: EventStats[],
  eventId: string,
  subEventId: string,
): number => {
  const event = Object.values(array).find(
    (item) => item.event_id.toString() === eventId,
  );

  const subEvent = event?.["sub_events"]?.find(
    (item) => item.sub_event_id.toString() === subEventId,
  );

  return Number(subEvent?.total ?? 0);
};

export const calcBallPosession = (
  homeArry: EventStats[],
  awayArry: EventStats[],
) => {
  const homePasses =
    getEvent(homeArry, "7") +
    getEvent(homeArry, "25") +
    getEvent(homeArry, "95");

  const awayPasses =
    getEvent(awayArry, "7") +
    getEvent(awayArry, "25") +
    getEvent(awayArry, "95");

  const total = homePasses + awayPasses;

  const home = Math.round((homePasses / total) * 100);
  const away = Math.round((awayPasses / total) * 100);

  return { home, away };
};

export const calcRugbyPosession = (
  homeArry: EventStats[],
  awayArry: EventStats[],
) => {
  const homePasses =
    getStat(homeArry, "Pass") +
    getStat(homeArry, "Incomplete Pass") +
    getStat(homeArry, "Forward pass") +
    getSubEvent(homeArry, "255", "645") +
    getSubEvent(homeArry, "255", "644");

  const awayPasses =
    getStat(awayArry, "Pass") +
    getStat(awayArry, "Incomplete Pass") +
    getStat(awayArry, "Forward pass") +
    getSubEvent(awayArry, "255", "645") +
    getSubEvent(awayArry, "255", "644");

  const total = homePasses + awayPasses;

  const home = Math.round((homePasses / total) * 100);
  const away = Math.round((awayPasses / total) * 100);

  return { home, away };
};

// does not factor in progressive passes
// export const passAccuracy = (
//   arry: Stats[],
//   complete: string,
//   incomplete: string
// ) => {
//   const compPasses = getStat(arry, complete);
//   const totalPasses = compPasses + getStat(arry, incomplete);

//   return Math.round((compPasses / totalPasses) * 100);
// };
