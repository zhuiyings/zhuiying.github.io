import React, { PureComponent } from "react";
import { Form, Tabs, PageHeader, notification } from "antd";
import Layouts from "../components/Layouts";

const { TabPane } = Tabs;

export default class login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEasy: true,
      showSpin: false,
    };
  }

  componentDidMount() {}

  changePassword = (payload) => {
    const { history, dispatch } = this.props;
    dispatch({
      type: "user/changePassword",
      payload,
      callback: (success) => {
        if (success) {
          notification["success"]({
            message: `修改密码成功，请重新登录！`,
          });
          setTimeout(() => {
            history.push("login");
          }, 2000);
        }
      },
    });
  };

  render() {
    return (
      <Layouts>
        <PageHeader title="个人中心" subTitle="修改密码"></PageHeader>
        <Tabs>
          <TabPane tab="修改密码" key="修改密码">
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ width: 400, margin: "0 auto" }}
            ></Form>
          </TabPane>
        </Tabs>
      </Layouts>
    );
  }
}
