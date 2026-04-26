import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m", target: 50 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = __ENV.API_URL || "http://localhost:8000";

export default function () {
  const surahsRes = http.get(`${BASE_URL}/surahs`);
  check(surahsRes, {
    "surahs status 200": (r) => r.status === 200,
    "has 114 surahs": (r) => JSON.parse(r.body).length === 114,
  });

  sleep(0.5);

  const surahNum = Math.floor(Math.random() * 114) + 1;
  const textRes = http.get(`${BASE_URL}/surah/${surahNum}/text`);
  check(textRes, {
    "text status 200": (r) => r.status === 200,
  });

  sleep(0.5);

  const transRes = http.get(`${BASE_URL}/surah/${surahNum}/translation?lang=en`);
  check(transRes, {
    "translation status 200": (r) => r.status === 200,
  });

  sleep(0.5);

  const searchRes = http.get(`${BASE_URL}/search?q=mercy&lang=en`);
  check(searchRes, {
    "search status 200": (r) => r.status === 200,
  });

  sleep(1);
}
