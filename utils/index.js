import moment from "moment";

export const getEarliestSunrise = (arr) => {
  const res = arr.reduce((day1, day2) => {
    if (!day1) return;
    if (moment(day1.sunrise, "h:mma").isBefore(moment(day2.sunrise, "h:mma"))) {
      return day1;
    } else {
      return day2;
    }
  });
  return res;
};

export const getRndCoordinates = (length) =>
  Array.from({ length }, () => ({
    lat: getRandomInRange(-180, 180, 5),
    lng: getRandomInRange(-180, 180, 5),
  }));

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
