import request from "../utils/request";
import config from "../config";

export async function top250Api(params) {
  return request(`${config.top250JSON}`, {
    method: "GET",
  });
}

export async function top500Api(params) {
  return request(
    `http://localhost:9000/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=recommend&page_limit=500&page_start=0`,
    {
      method: "GET",
    }
  );
}

export async function hotListApi(params) {
  return request(`${config.hotListUrl}`, {
    method: "GET",
  });
}

export async function us_boxUrl(params) {
  return request(`${config.us_boxUrl}&start=${params}`, {
    method: "GET",
  });
}

export async function rankApi1(start) {
  return request(
    // `${config.rankUrl}?sort=T&tags=${params.tags}&start=${params.start}&countries=${params.countries}&genres=${params.genres}&year_range=${params.year_range}&range=${params.range}`,
    `https://m.douban.com/rexxar/api/v2/movie/recommend?refresh=0&start=0&count=20&selected_categories=%7B%7D&uncollect=false&sort=T&tags=2021`,
    {
      method: "GET",
      headers: {
        Referer: "https://movie.douban.com/explore",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42",
      },
    }
  );
}

export async function rankApi(params) {
  return request(
    `https://m.douban.com/rexxar/api/v2/movie/recommend?refresh=0&start=0&count=20&selected_categories=%7B%7D&uncollect=false&sort=T&tags=2022`,
    {
      method: "GET",
      headers: {
        Referer: "https://movie.douban.com/explore",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42",
        Authorization: `Bearer 123}`,
        "Content-Type": "application/json-patch+json",
      },
    }
  );
}
