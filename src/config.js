const key = `0df993c66c0c636e29ecbb5344252a4a`;
// const key = `0b2bdeda43b5688921839c8ecb20399b`

const config = {
  hotUrl: `https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags=%E7%94%B5%E5%BD%B1&unwatched=1&start=0`,

  rankListUrl: `https://movie.douban.com/j/new_search_subjects`,

  top250Url: `https://douban.uieee.com/v2/movie/top250?apikey=${key}&count=1000`,

  top250JSON: `./lib/top250.json`,

  // https://movie.douban.com/j/new_search_subjects?sort=T&range=0,10&tags=%E7%94%B5%E5%BD%B1&unwatched=1&start=0
  hotListUrl: `./lib/hot.json`,

  us_boxUrl: `https://api.douban.com/v2/movie/top250?q=我&apikey=${key}&count=1000`,

  us_boxJSON: `us_box.json`,

  // top250Url: `https://douban.uieee.com/v2/movie/new_movies?apikey=${key}&count=10000`,

  // top250Url: `http://api.douban.com/v2/movie/in_theaters?apikey=${key}&start=0&count=10`,
};

export default config;
