import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table, Tag } from "antd";
import Layouts from "../../components/Layouts";

@connect(({ car }) => ({ car }))
export default class CarData extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      car: { list },
    } = this.props;

    const dataSource = list
      .map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      })
      .sort(this.compare("type2"));

    console.log(JSON.stringify(dataSource));

    const columns = [
      {
        title: "序号",
        dataIndex: "index",
      },
      {
        title: "车型",
        dataIndex: "name",
      },
      {
        title: "级别",
        dataIndex: "type2",
        render: (i, item) => (
          <Tag
            color={i === "轿车" ? "cyan" : i === "SUV" ? "red" : "purple"}
            // style={{
            //   padding: "3px 8px",
            //   borderRadius: 3,
            //   fontSize: 13,
            //   fontWeight: "bold",
            //   color: "#000",
            // }}
          >
            {item.type1}
            {i}
          </Tag>
        ),
      },
      {
        title: "长",
        dataIndex: "a1",
      },
      {
        title: "轴距",
        dataIndex: "a4",
      },
      {
        title: "发动机",
        dataIndex: "b1",
        render: (i, item) => item.b1 + item.b2,
      },
      {
        title: "马力",
        dataIndex: "b3",
      },
      {
        title: "变速箱",
        dataIndex: "c1",
      },
      {
        title: "悬架",
        dataIndex: "d1",
      },
      {
        title: "半年销量",
        dataIndex: "xl",
      },
    ];

    return (
      <Layouts>
        <div>
          <Table
            size="small"
            dataSource={dataSource}
            columns={columns}
            pagination={{ defaultPageSize: 100 }}
            bordered
            footer={() => "3月，数据更新时间 2021-04-29"}
          />
        </div>
      </Layouts>
    );
  }
}
