import fetch from "node-fetch";
import R from "ramda";

let url = "https://api.sunrise-sunset.org/json";

export async function getSunTimes(lat, lng) {
  try {
    const response = await fetch(url + `?lat=${lat}&lng=${lng}`);
    const json = await response.json();
    if (json.status !== "OK") {
      throw Error(json.status);
    } else {
      const { sunrise, sunset, day_length } = json.results;
      return { sunrise, sunset, day_length };
    }
  } catch (e) {
    console.log(e);
  }
  return {};
}
