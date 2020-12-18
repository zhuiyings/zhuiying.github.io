import { message } from "antd";
import { top250Api, rankApi } from "../services/httpApi";
import { sqlInsert, sqlCreate, sqlSelect, sqlDelete } from "../services/webSql";

const tableName = ["top250"];

export default {
  namespace: "douban",

  state: { top250: [], online: [], rankList: [] },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  effects: {
    *rankList({ payload, callback }, { call, put }) {
      const {
        data: { data }
      } = yield call(rankApi, payload);
      if (callback) callback(data);
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
          state: item.state ? 1 : 0
        };
      });
      const { state } = yield call(sqlInsert, `top250`, items);
      if (state) {
        message.success("下载成功");
      } else {
        message.error("下载失败");
      }
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
          state: item.state ? 1 : 0
        };
      });
      yield put({
        type: "save",
        payload: { online: items }
      });
    },

    *list({ payload }, { call, put }) {
      const { state, data } = yield call(sqlSelect, `top250`, payload);
      const { data: online } = yield call(top250Api);
      const items = data.map(i => {
        const filter = online.filter(item => item.id === String(i.id));
        return {
          ...i,
          directors: JSON.parse(i.directors),
          casts: JSON.parse(i.casts),
          total: (i.collect_count / 10000 + (250 - i.key) / 5).toFixed(0),
          has_video: filter[0].has_video
        };
      });
      const items_1 = items.filter(i => i.has_video);
      console.log(items_1.slice(0, 5));
      const items_2 = items.filter(i => !i.has_video);
      console.log(items_2.slice(0, 5));
      if (state) {
        yield put({
          type: "save",
          payload: { top250: [...items_1, ...items_2] }
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
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
