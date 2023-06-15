import React, { PureComponent } from "react";
import { Row, Col, Form, Card, Select, List, Layout, Table , Input, Button } from 'antd';

const { Content } = Layout;

export class TableDatData extends PureComponent {
  state = {
    data: [],
    pagination: {},
    tableLoading: false,
  };
    searchInput: any;

  componentDidMount() {
    this.fetch();
  }

  getColumnSearchProps = (dataIndex :any) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    // filterIcon: (filtered: any) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name: any) => `${name.first} ${name.last}`,
    width: '20%',
    ...this.getColumnSearchProps('name'),
  }, {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  }, {
    title: 'Email',
    dataIndex: 'email',
  }];

  handleSearch = (selectedKeys: any, confirm: any) => {
    // selectedKeys[0] contains the text value
    confirm();
  }

  handleReset = (clearFilters: any) => {
    // resets filters
    clearFilters();
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const pager: any = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ tableLoading: true });
    fetch('https://randomuser.me/api/?results=10', {
      method: 'GET',
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        const pagination: any = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.setState({
          tableLoading: false,
          data: data.results,
          pagination,
        });
      })
    });
  }

  render() {

    return (
      <Content style={{ padding: '50px 50px' }}>
        <Table
          columns={this.columns}
        //   rowKey={record => record['login']['uuid']}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.tableLoading}
          onChange={this.handleTableChange}
        />
      </Content>
    )
  }
}
