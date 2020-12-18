import React, { PureComponent } from "react";
import Layouts from "../components/Layouts";
import { Descriptions } from "antd";

const list = [
  { label: "姓名", value: "刘亚飞" },
  { label: "姓别", value: "男" },
  { label: "民族", value: "汉" },
  { label: "出生年月", value: "1994.11" },
  { label: "开始工作时间", value: "2015.07" },
  { label: "毕业院校", value: "河南理工大学" },
  { label: "学历", value: "本科" },
  { label: "邮箱", value: "liuyafeis@outlook.com" },
  { label: "电话", value: "18620958312" },
  { label: "qq", value: "50669290" },
];

export default class my extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <Layouts>
        <Descriptions title="">
          {list.map((item, index) => (
            <Descriptions.Item label={item.label} key={index}>
              {item.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Layouts>
    );
  }
}
