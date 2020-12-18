import request from "../utils/request";
import config from "../config";

export async function top250Api(params) {
  return request(`${config.top250JSON}`, {
    method: "GET"
  });
}

export async function us_boxUrl(params) {
  return request(`${config.us_boxUrl}&start=${params}`, {
    method: "GET"
  });
}

export async function rankApi(params) {
  return request(
    `${config.rankUrl}?sort=T&tags=${params.tags}&start=${params.start}&countries=${params.countries}&genres=${params.genres}&year_range=${params.year_range}&range=${params.range}`,
    {
      method: "GET"
    }
  );
}
