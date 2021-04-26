import React, { PureComponent } from "react";
import { connect } from "dva";
import Layouts from "../../components/Layouts";
import { Table, Tag, Button, Input } from "antd";

@connect(({ douban }) => ({
  douban,
}))
export default class no extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.hotList();
  }

  hotList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "douban/hotList",
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
      douban: { hotList },
    } = this.props;

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
            <img
              // src={`https://images.weserv.nl/?url=${item.cover}`}
              src={item.cover}
              alt=""
              height={36}
            />
          </span>
        ),
      },
      {
        title: "名称",
        dataIndex: "title",
        ...this.getColumnSearchProps("title"),
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
        render: (i) => <Tag color={i >= 8 ? "blue" : "red"}>{i}</Tag>,
      },
      {
        title: "热度(万)",
        dataIndex: "hot",
      },
      {
        title: "导演",
        dataIndex: "directors",
        render: (i) => i.join("/"),
      },
      {
        title: "主演",
        dataIndex: "casts",
        width: 400,
        render: (i) => i.join("/"),
      },
    ];
    return (
      <Layouts>
        <Table
          size="small"
          columns={columns}
          dataSource={hotList}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["10", "25", "50", "100", "200"],
          }}
        />
        <span>共{hotList.length}条</span>
        <span style={{ float: "right" }}>更新至2020-12-21</span>
      </Layouts>
    );
  }
}
