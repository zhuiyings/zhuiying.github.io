import React, { PureComponent } from "react";
import { connect } from "dva";
import moment from "moment";
import Layouts from "../../components/Layouts";
import { Descriptions, Tag, Button, Input } from "antd";

export default class no extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <Layouts>
        <Descriptions title="" column={1}>
          <Descriptions.Item label="邮箱">
            liuyafeis@outlook.com
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">50669290@qq.com</Descriptions.Item>
        </Descriptions>
      </Layouts>
    );
  }
}
