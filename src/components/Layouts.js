import React, { PureComponent } from "react";
import { Link } from "dva/router";
import zhCN from "antd/es/locale/zh_CN";
import { Menu, Avatar, Layout, ConfigProvider, Affix } from "antd";
import {
  MailOutlined,
  HomeOutlined,
  CarOutlined,
  YoutubeOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

export default class layouts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { children } = this.props;

    let menuList = [
      {
        title: "汽车榜",
        icon: <LineChartOutlined />,
        key: "/car/data",
      },
      {
        title: "中保研",
        icon: <CarOutlined />,
        key: "/car/zby",
      },
      {
        title: "豆瓣最热",
        icon: <YoutubeOutlined />,
        key: "/film/hot",
      },
      {
        title: "豆瓣Top250",
        icon: <YoutubeOutlined />,
        key: "/film/top",
      },
      {
        title: "关于我",
        icon: <MailOutlined />,
        key: "/my/info",
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
