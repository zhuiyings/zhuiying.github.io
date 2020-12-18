/* eslint-disable no-useless-concat */
/* eslint-disable array-callback-return */
import { objToArr, sqlOpen } from '../utils/util';

export async function sqlCreate(names) {
  return new Promise((resolve, reject) => {
    sqlOpen().transaction(function(tx) {
      names.map(name => {
        let title;
        switch (name) {
          case 'top250':
            title =
              '(id int,' +
              'key int,' +
              'title text,' +
              'alt text,' +
              'img text,' +
              'score int,' +
              'collect_count int,' +
              'comment int,' +
              'durations int,' +
              'pubdates int,' +
              'genres text,' +
              'directors text,' +
              'casts text,' +
              'state int,' +
              'time int)';
            break;
          default:
            title = '(label text,' + 'value text)';
            break;
        }
        tx.executeSql(
          'create table if not exists ' + name + title,
          [],
          function(v, success) {
            resolve({ state: true, msg: `${name}表创建成功` });
          },
          function(v, error) {
            console.error(`sqlCreate：${name}失败`, error.message);
            reject({ state: false, msg: `${name}表创建失败` });
          }
        );
      });
    });
  });
}

export async function sqlInsert(name, items) {
  return new Promise((resolve, reject) => {
    if (!items.length) {
      resolve({ state: true, msg: `${name}表插入空数据成功` });
    }
    sqlOpen().transaction(function(tx) {
      items.map((data, index) => {
        const item = { ...data, status: 0 };
        let value;
        let key;
        tx.executeSql(
          `delete from ${name} where id = ?`,
          [item.id],
          function(v, success) {},
          function(v, error) {
            console.error(`sqlInsert：${name}删除单条失败`, error.message);
          }
        );
        switch (name) {
          case 'top250':
            value = '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            key = [
              item.id,
              item.key,
              item.title,
              item.alt,
              item.img,
              item.score,
              item.collect_count,
              item.comment,
              item.durations,
              item.pubdates,
              item.genres,
              JSON.stringify(item.directors),
              JSON.stringify(item.casts),
              item.state,
              new Date().getTime()
            ];
            break;
          default:
            value = '(?,?)';
            key = [item.name, item.id];
            break;
        }
        tx.executeSql(
          'insert into ' + name + ' values ' + value,
          key,
          (v, result) => {
            resolve({ state: true, msg: `${name}表插入数据成功` });
          },
          (v, error) => {
            console.error('sqlInsert：', error.message);
            reject({
              state: false,
              msg: `${name}表插入数据失败：` + error.message
            });
          }
        );
      });
    });
  });
}

export async function sqlSelect(name, s, fields) {
  return new Promise((resolve, reject) => {
    const search = `select ${fields || `*`} from ${name} ${s || ``}`;
    sqlOpen().transaction(function(tx) {
      tx.executeSql(
        search,
        [],
        function(v, result) {
          resolve({
            state: true,
            msg: `${name}表查询成功`,
            data: objToArr(result.rows)
          });
        },
        function(v, error) {
          console.error('sqlSelect：', search);
          resolve({
            state: false,
            msg: `${name}表查询失败`,
            data: []
          });
        }
      );
    });
  });
}

export async function sqlDeleteById(name, items) {
  console.log(items);
  return new Promise((resolve, reject) => {
    sqlOpen().transaction(function(tx) {
      items.map(item => {
        tx.executeSql(
          `delete from ${name} where id=?`,
          [item.id],
          function(v, result) {
            resolve({ state: true, msg: `${name}表删除数据成功` });
          },
          function(v, error) {
            console.error('sqlDeleteById', error.message);
            resolve({ state: false, msg: `${name}表删除数据失败` });
          }
        );
      });
    });
  });
}

export async function sqlDelete(names) {
  return new Promise((resolve, reject) => {
    sqlOpen().transaction(function(tx) {
      names.map(name => {
        tx.executeSql(
          'delete from ' + name + '',
          [],
          function(v, result) {
            resolve({ state: true, msg: `${name}表清空成功` });
          },
          function(v, error) {
            console.error('sqlDelete', error.message);
            resolve({ state: false, msg: `${name}表清空失败` });
          }
        );
      });
    });
  });
}

export async function sqlDrop(names) {
  return new Promise((resolve, reject) => {
    sqlOpen().transaction(function(tx) {
      names.map(name => {
        tx.executeSql(
          'drop table ' + name + '',
          [],
          function(v, result) {
            resolve({ state: true, msg: `${name}表删除成功` });
          },
          function(v, error) {
            console.error('sqlDrop', error.message);
            resolve({ state: false, msg: `${name}表删除失败` });
          }
        );
      });
    });
  });
}
