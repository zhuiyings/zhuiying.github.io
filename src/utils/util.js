const objToArr = obj => {
  let arr = [];
  for (let item of obj) {
    arr.push(item);
  }
  return arr;
};

const sqlOpen = () => {
  const db = openDatabase('豆瓣', "", "My Database", 1024 * 1024 * 10);
  return db;
};

export {
  objToArr,
  sqlOpen,
};
