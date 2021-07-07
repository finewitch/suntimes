import { getEarliestSunrise, getRndCoordinates } from "./utils/index.js";
import { getSunTimes } from "./get-suntime.js";

const CONCURRENT = 5;
const TOTAL_COORDINATES = 100;

const fetchEarliestSunriseDayLength = async () => {
  const randomCoordinates = getRndCoordinates(TOTAL_COORDINATES);
  let sunTimes = [];

  try {
    while (randomCoordinates.length) {
      sunTimes.push(
        ...(await Promise.all(
          randomCoordinates
            .splice(0, CONCURRENT)
            .map(async ({ lat, lng }) => await getSunTimes(lat, lng))
        ))
      );
    }
    const earliestSunrise = getEarliestSunrise(sunTimes);
    return `
    shortest day was ${earliestSunrise.day_length} hours
    sun rose on ${earliestSunrise.sunrise} 
    and went down on ${earliestSunrise.sunset}`;
  } catch (e) {
    console.log(e);
  }
};

const earliestSunriseDayLength = await fetchEarliestSunriseDayLength();
console.log(earliestSunriseDayLength);
