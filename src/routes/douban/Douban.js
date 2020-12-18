import React, { PureComponent } from "react";
import { connect } from "dva";
import moment from "moment";
import Layouts from "../../components/Layouts";
import { Table, Tag, Button, Input } from "antd";

@connect(({ douban }) => ({
  douban,
}))
export default class no extends PureComponent {
  componentDidMount() {
    this.online();
  }

  online = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "douban/online",
    });
  };

  submit = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: "douban/submit",
      payload: { ...payload, state: 1 },
      callback: (state) => {
        if (state) {
          this.list();
        }
      },
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          确定
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    // filterIcon: (filtered) => (
    //   <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    // ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const {
      douban: { online },
    } = this.props;
    console.log(online);

    const columns = [
      {
        title: "排名",
        dataIndex: "key",
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: "照片",
        dataIndex: "img",
        render: (i, item) => (
          <span>
            <img src={item.img} alt="" height={36} />
          </span>
        ),
      },
      {
        title: "名称",
        dataIndex: "title",
        ...this.getColumnSearchProps("title"),
        render: (i, item) => (
          <a href={item.alt} target="_blank" rel="noopener noreferrer">
            {i}
          </a>
        ),
      },
      {
        title: "评分",
        dataIndex: "score",
        sorter: (a, b) => a.score - b.score,
        render: (i) => (
          <span style={{ color: i >= 9 ? "green" : "red" }}>{i}</span>
        ),
      },
      {
        title: "人数(万)",
        dataIndex: "collect_count",
        sorter: (a, b) => a.collect_count - b.collect_count,
        render: (i) => (i / 10000).toFixed(1),
      },
      {
        title: "评论(万)",
        dataIndex: "comment",
        sorter: (a, b) => a.comment - b.comment,
        render: (i) => (i / 10000).toFixed(1),
      },
      {
        title: "播放",
        dataIndex: "has_video",
        filters: [
          { text: "是", value: true },
          { text: "否", value: false },
        ],
        onFilter: (value, record) => record.has_video === value,
        render: (i) => (
          <Tag color={i ? "cyan" : "volcano"}> {i ? "是" : "否"}</Tag>
        ),
      },
      {
        title: "上映",
        dataIndex: "pubdates",
        sorter: (a, b) => a.pubdates - b.pubdates,
        render: (i) => moment(i).format("YYYY"),
      },
      {
        title: "时长",
        dataIndex: "durations",
        sorter: (a, b) => a.durations - b.durations,
      },
      // {
      //   title: '修改时间',
      //   dataIndex: 'time',
      //   sorter: (a, b) => a.time - b.time,
      //   render: i => moment(i).format('YYYY-MM-DD HH:mm:ss')
      // },
      {
        title: "类型",
        dataIndex: "genres",
      },
      // {
      //   title: '导演',
      //   dataIndex: 'directors',
      //   render: i =>
      //     i.map(j => (
      //       <a href={j.alt} target="_blank" rel="noopener noreferrer">
      //         {j.name}
      //         <br />
      //       </a>
      //     ))
      // },
      // {
      //   title: '主演',
      //   dataIndex: 'casts',
      //   render: i =>
      //     i.map(j => (
      //       <a href={j.alt} target="_blank" rel="noopener noreferrer">
      //         {j.name} /{' '}
      //       </a>
      //     ))
      // },
      // {
      //   title: "状态",
      //   dataIndex: "state",
      //   render: (i) => (
      //     <Tag color={i ? "volcano" : "cyan"}> {i ? "已看" : "未看"}</Tag>
      //   ),
      // },
      // {
      //   title: "操作",
      //   key: "operation",
      //   render: (i) => (
      //     <span>
      //       <a
      //         style={{ marginRight: 20 }}
      //         onClick={() => {
      //           this.submit(i);
      //         }}
      //       >
      //         设为{i.state ? "未看" : "已看"}
      //       </a>
      //     </span>
      //   ),
      // },
    ];
    return (
      <Layouts>
        <Table
          columns={columns}
          dataSource={online}
          // size="small"
          // bordered
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "40", "50"],
          }}
        />
        <span>共{online.length}条</span>
        <span style={{ float: "right" }}>更新至2019-10-15</span>
      </Layouts>
    );
  }
}
