import React, { PureComponent } from "react";
import { createHashHistory } from "history";
import { connect } from "dva";
import { Link } from "dva/router";
import { Menu, Dropdown, Avatar, Layout, ConfigProvider, Affix } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  CarOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;

export default class layouts extends PureComponent {
  constructor(props) {
    super(props);
    const { active } = this.props;

    this.state = {};
  }

  render() {
    const { children } = this.props;

    let menuList = [
      {
        title: "中保研",
        icon: <CarOutlined />,
        key: "/zby",
      },
      {
        title: "豆瓣",
        icon: <YoutubeOutlined />,
        key: "/douban",
      },
      {
        title: "联系我",
        icon: <MailOutlined />,
        key: "/mail",
      },
      // {
      //   title: "日常监管",
      //   key: "/supervise",
      //   icon: <AppstoreOutlined />,
      //   subMenu: [
      //     {
      //       title: "区域监管",
      //       key: "/region",
      //     },
      //     {
      //       title: "项目监管",
      //       key: "/project",
      //     },
      //     {
      //       title: "查处计划",
      //       key: "/plan",
      //     },
      //     {
      //       title: "复核计划",
      //       key: "/review",
      //     },
      //   ],
      // },
    ];

    return (
      <ConfigProvider locale={zhCN}>
        <Layout style={{ height: "100%", background: "#f6f6f6" }}>
          <Affix offsetTop={0}>
            <div style={{ background: "#fff" }}>
              <Menu
                mode="horizontal"
                style={{
                  fontSize: 16,
                  width: 1200,
                  margin: "0 auto",
                }}
              >
                {menuList.map((item, index) =>
                  item.subMenu ? (
                    <Menu.SubMenu
                      key={item.key}
                      icon={item.icon || <HomeOutlined />}
                      title={
                        <span>
                          <span>{item.title}</span>
                        </span>
                      }
                    >
                      {item.subMenu.map((ite, ind) => (
                        <Menu.Item
                          key={ite.key}
                          icon={item.icon || <HomeOutlined />}
                        >
                          <Link to={ite.key}>{ite.title}</Link>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ) : (
                    <Menu.Item
                      key={item.key}
                      icon={item.icon || <HomeOutlined />}
                    >
                      <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                  )
                )}
                <Avatar
                  style={{
                    float: "right",
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    margin: 6,
                  }}
                >
                  L
                </Avatar>
              </Menu>
            </div>
          </Affix>
          <Content>
            <div
              style={{
                margin: "0 auto",
                padding: 20,
                backgroundColor: "#fff",
                width: 1200,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }
}
