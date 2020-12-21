import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table, Tag } from "antd";
import "../../node_modules/antd/dist/antd.css";
import Layouts from "../components/Layouts";

@connect(({ zby }) => ({ zby }))
export default class Zby extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  getTag = (v) => (
    <Tag
      color={
        v === 1
          ? "#00cc00" //00cc00 4CAF50
          : v === 2
          ? "#ffff33" //#ffff33 FFEB3B
          : v === 3
          ? "#ff9900" //#ff9900 FF9800
          : v === 4
          ? "#f44336"
          : "#9e9e9e"
      }
      style={{
        padding: "3px 8px",
        borderRadius: 3,
        fontSize: 13,
        fontWeight: "bold",
        color: "#000",
      }}
    >
      {v === 1
        ? "G 优秀"
        : v === 2
        ? "A 良好"
        : v === 3
        ? "M 一般"
        : v === 4
        ? "P 较差"
        : "未配置"}
    </Tag>
  );

  compare = (key) => {
    return (obj1, obj2) => {
      let value1 = obj1[key];
      let value2 = obj2[key];
      if (value1 < value2) {
        return 1;
      } else if (value1 > value2) {
        return -1;
      } else {
        return 0;
      }
    };
  };

  render() {
    const {
      zby: { dataSource: data },
    } = this.props;

    const dataSource = data
      .map((i, index) => {
        return {
          ...i,
          key: index + 1,
          score:
            (i.a1 === 4
              ? -700
              : i.a1 === 3
              ? -200
              : i.a1 === 2
              ? 20
              : i.a1 === 1
              ? 40
              : 0) +
            (i.a2 === 4
              ? -400
              : i.a2 === 3
              ? -100
              : i.a2 === 2
              ? 25
              : i.a2 === 1
              ? 35
              : 0) +
            (i.a3 === 4
              ? 0
              : i.a3 === 3
              ? 1
              : i.a3 === 2
              ? 3
              : i.a3 === 1
              ? 5
              : 0) +
            (i.a4 === 4
              ? 0
              : i.a4 === 3
              ? 1
              : i.a4 === 2
              ? 3
              : i.a4 === 1
              ? 5
              : 0) +
            (i.b1 === 4
              ? 0
              : i.b1 === 3
              ? 1
              : i.b1 === 2
              ? 3
              : i.b1 === 1
              ? 5
              : 0) +
            (i.b2 === 4
              ? 0
              : i.b2 === 3
              ? 1
              : i.b2 === 2
              ? 3
              : i.b2 === 1
              ? 5
              : 3) +
            (i.b3 === 4
              ? 1
              : i.b3 === 3
              ? 3
              : i.b3 === 2
              ? 4
              : i.b3 === 1
              ? 5
              : 2) +
            i.link * -0.01,
        };
      })
      .sort(this.compare("score"));

    // console.log(JSON.stringify(dataSource))

    const width = 100;

    const columns = [
      {
        title: `序号(${data.length})`,
        dataIndex: "link",
        sorter: (a, b) => a.link - b.link,
        render: (v) => (
          <a
            href={`https://zby.org.cn/home/safety/pageone/id/${v}.html`}
            target="_blank"
            rel="noreferrer"
          >
            {v}
          </a>
        ),
      },
      {
        title: "厂商",
        dataIndex: "name1",
      },
      {
        title: "品牌",
        dataIndex: "name2",
        onFilter: (value, record) => record.name2.indexOf(value) === 0,
        filters: [
          {
            text: "德系",
            value: "德系",
            children: [
              {
                text: "奔驰",
                value: "奔驰",
              },
              {
                text: "宝马",
                value: "宝马",
              },
              {
                text: "奥迪",
                value: "奥迪",
              },
              {
                text: "大众",
                value: "大众",
              },
            ],
          },
          {
            text: "日系",
            value: "日系",
            children: [
              {
                text: "丰田",
                value: "丰田",
              },
              {
                text: "本田",
                value: "本田",
              },
              {
                text: "日产",
                value: "日产",
              },
              {
                text: "马自达",
                value: "马自达",
              },
            ],
          },
          {
            text: "美系",
            value: "美系",
            children: [
              {
                text: "凯迪拉克",
                value: "凯迪拉克",
              },
              {
                text: "特斯拉",
                value: "特斯拉",
              },
              {
                text: "福特",
                value: "福特",
              },
              {
                text: "别克",
                value: "别克",
              },
              {
                text: "雪佛兰",
                value: "雪佛兰",
              },
            ],
          },
          {
            text: "韩系",
            value: "韩系",
            children: [
              {
                text: "现代",
                value: "现代",
              },
              {
                text: "起亚",
                value: "起亚",
              },
            ],
          },
        ],
      },
      {
        title: "型号",
        dataIndex: "name3",
      },
      {
        title: "正面25%偏置碰撞",
        dataIndex: "a1",
        render: (v) => this.getTag(v),
        width,
      },
      {
        title: "侧面碰撞",
        dataIndex: "a2",
        render: (v) => this.getTag(v),
        width,
      },
      {
        title: "车顶强度",
        dataIndex: "a3",
        render: (v) => this.getTag(v),
        width,
      },
      {
        title: "座椅/头枕",
        dataIndex: "a4",
        render: (v) => this.getTag(v),
        width,
      },
      {
        title: "车外行人安全指数",
        dataIndex: "b1",
        render: (v) => this.getTag(v),
        width,
      },
      {
        title: "车辆辅助安全指数",
        dataIndex: "b2",
        render: (v) => this.getTag(v),
        width,
      },
      {
        title: "耐撞性与维修经济性指数",
        dataIndex: "b3",
        render: (v) => this.getTag(v),
        width,
      },
      // {
      //   title: "款式",
      //   dataIndex: "name4",
      //   render: (name4, item) => name4 + "款 " + item.name5,
      // },
      // {
      //   title: "价格",
      //   dataIndex: "price",
      // },
      {
        title: "年份",
        dataIndex: "year",
        onFilter: (value, record) => (record.year + "").indexOf(value) === 0,
        filters: [
          {
            text: "2020",
            value: 2020,
          },
          {
            text: "2019",
            value: 2019,
          },
          {
            text: "2018",
            value: 2018,
          },
        ],
      },
      // {
      //   title: "得分",
      //   dataIndex: "score",
      // },
    ];

    return (
      <Layouts>
        <div>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ defaultPageSize: 100 }}
            size="small"
          />
        </div>
      </Layouts>
    );
  }
}
