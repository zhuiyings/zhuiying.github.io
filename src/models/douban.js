import { message } from "antd";
import { top250Api, rankApi, hotListApi } from "../services/httpApi";
import { sqlInsert, sqlCreate, sqlSelect, sqlDelete } from "../services/webSql";
import fetchJsonp from "fetch-jsonp";
import config from "../config";

const tableName = ["top250"];

export default {
  namespace: "douban",

  state: { top250: [], online: [], rankList: [], hotList: [] },

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    *hotList({ payload, callback }, { call, put }) {
      const hot = [
        { title: "我不是药神", hot: 462.5 },
        { title: "西虹市首富", hot: 242.3 },
        { title: "当幸福来敲门", hot: 204.9 },
        { title: "少年派的奇幻漂流", hot: 180.4 },
        { title: "无名之辈", hot: 163.2 },
        { title: "初恋这件小事", hot: 152.2 },
        { title: "哈尔的移动城堡", hot: 134.7 },
        { title: "疯狂的外星人", hot: 125.6 },
        { title: "老炮儿", hot: 119.7 },
        { title: "无问西东", hot: 115.8 },
        { title: "熔炉", hot: 109.7 },
        { title: "蚁人", hot: 105.5 },
        { title: "黑客帝国", hot: 100.6 },
        { title: "傲慢与偏见", hot: 96.7 },
        { title: "驯龙高手", hot: 94.3 },
        { title: "人在囧途", hot: 92.0 },
        { title: "哈利·波特与密室", hot: 88.3 },
        { title: "蜘蛛侠：平行宇宙", hot: 84.9 },
        { title: "心灵捕手", hot: 81.3 },
        { title: "功夫熊猫", hot: 79.1 },
        { title: "了不起的盖茨比", hot: 77.3 },
      ];
      const { data } = yield call(hotListApi);
      console.log(data);
      const items = data.map((item, index) => {
        const filter = hot.filter((i) => item.title === i.title);
        return {
          ...item,
          key: index + 1,
          hot: filter.length ? filter[0].hot : "",
        };
      });
      yield put({
        type: "save",
        payload: { hotList: items },
      });
    },

    *online({ payload }, { call, put }) {
      const { data } = yield call(top250Api);
      console.log(data.slice(0, 10));
      const items = data.map((item, index) => {
        return {
          ...item,
          key: index + 1,
          img: item.images.small,
          score: item.rating.average,
          comment:
            item.rating.details[1] +
            item.rating.details[2] +
            item.rating.details[3] +
            item.rating.details[4] +
            item.rating.details[5],
          durations: item.durations[0].split("分钟")[0],
          pubdates: new Date(item.pubdates[0].slice(0, 10)).getTime(),
          genres: item.genres.join("/"),
          state: item.state ? 1 : 0,
        };
      });
      yield put({
        type: "save",
        payload: { online: items },
      });
    },

    *rankList({ payload, callback }, { call, put }) {
      const data = yield call(rankApi, payload);
      console.log(data);
      // yield put({
      //   type: "save",
      //   payload: { rankList: data },
      // });
      // if (callback) callback(data);
    },

    *douban({ payload, callback }, { call }) {
      const year = 2017;
      yield fetchJsonp(
        `https://m.douban.com/rexxar/api/v2/movie/recommend?refresh=0&start=0&count=20&selected_categories=%7B%7D&uncollect=false&sort=T&tags=${year}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(year, data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    *init({ payload, callback }, { call, put }) {
      const { state } = yield call(sqlCreate, tableName);
      if (callback) callback(state);
      if (!state) {
        message.error("初始化失败");
      }
    },

    *clear({ payload }, { call, put }) {
      const { state } = yield call(sqlDelete, tableName);
      if (state) {
        message.success("清空成功");
      } else {
        message.error("清空失败");
      }
    },

    *download({ payload }, { call, put }) {
      const { data } = yield call(top250Api);
      console.log(data.slice(0, 10));
      const items = data.map((item, index) => {
        return {
          ...item,
          key: index + 1,
          img: item.images.small,
          score: item.rating.average,
          comment:
            item.rating.details[1] +
            item.rating.details[2] +
            item.rating.details[3] +
            item.rating.details[4] +
            item.rating.details[5],
          durations: item.durations[0].split("分钟")[0],
          pubdates: new Date(item.pubdates[0].slice(0, 10)).getTime(),
          genres: item.genres.join("/"),
          state: item.state ? 1 : 0,
        };
      });
      const { state } = yield call(sqlInsert, `top250`, items);
      if (state) {
        message.success("下载成功");
      } else {
        message.error("下载失败");
      }
    },

    *list({ payload }, { call, put }) {
      const { state, data } = yield call(sqlSelect, `top250`, payload);
      const { data: online } = yield call(top250Api);
      const items = data.map((i) => {
        const filter = online.filter((item) => item.id === String(i.id));
        return {
          ...i,
          directors: JSON.parse(i.directors),
          casts: JSON.parse(i.casts),
          total: (i.collect_count / 10000 + (250 - i.key) / 5).toFixed(0),
          has_video: filter[0].has_video,
        };
      });
      const items_1 = items.filter((i) => i.has_video);
      console.log(items_1.slice(0, 5));
      const items_2 = items.filter((i) => !i.has_video);
      console.log(items_2.slice(0, 5));
      if (state) {
        yield put({
          type: "save",
          payload: { top250: [...items_1, ...items_2] },
        });
      } else {
        message.error("加载失败");
      }
    },

    *submit({ payload, callback }, { call, put }) {
      const { state } = yield call(sqlInsert, `top250`, [payload]);
      if (callback) callback(state);
      if (!state) {
        message.error("加载失败");
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
