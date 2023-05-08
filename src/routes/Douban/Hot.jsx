import React, { useState, useEffect } from "react";
import { connect } from "dva";
import Layouts from "../../components/Layouts";
import { Table, Tag } from "antd";

export default connect(({ douban }) => ({
  douban,
}))(Hot);

function Hot({ dispatch, douban: { rankList } }) {
  const [loading, setLoading] = useState(false);

  const _rankList = (payload) => {
    dispatch({
      type: "douban/douban",
      payload,
    });
  };

  useEffect(() => {
    _rankList(0);
  }, []);

  const columns = [
    // {
    //   title: "照片",
    //   dataIndex: "img",
    //   render: (i, item) => (
    //     <span>
    //       <img
    //         // src={`https://images.weserv.nl/?url=${item.cover}`}
    //         src={item.cover}
    //         alt=""
    //         height={36}
    //       />
    //     </span>
    //   ),
    // },
    {
      title: "名称",
      dataIndex: "title",
      render: (i, item) => (
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {i}
        </a>
      ),
    },
    {
      title: "评分",
      dataIndex: "rate",
      sorter: (a, b) => a.rate - b.rate,
      render: (i) => (
        <Tag
          color={
            i >= 9 ? "blue-inverse" : i >= 8 ? "green-inverse" : "red-inverse"
          }
        >
          {i}
        </Tag>
      ),
    },
    {
      title: "热度(万)",
      dataIndex: "hot",
    },
    {
      title: "导演",
      dataIndex: "directors",
      render: (i) => i.slice(0, 1).join("/"),
    },
    {
      title: "主演",
      dataIndex: "casts",
      width: 400,
      render: (i) => i.slice(0, 1).join("/"),
    },
  ];
  return (
    <Layouts>
      <Table
        size="small"
        columns={columns}
        dataSource={rankList}
        loading={loading}
        pagination={{
          defaultPageSize: 20,
          total: 1000,
          showQuickJumper: true,
          showTotal: (v) => `共${v}条`,
        }}
        onChange={(v) => {
          _rankList((v.current - 1) * 20);
        }}
      />
      <span>共{rankList.length}条</span>
      <span style={{ float: "right" }}>实时数据</span>
    </Layouts>
  );
}
