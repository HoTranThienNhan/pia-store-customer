import { Button, Divider, Popconfirm, Radio, Table } from 'antd';
import React, { useState } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [], isLoading = false, components = [], handleActiveMultipleConfirm } = props;

    const [selectedMultipleRowKeys, setSelectedMultipleRowKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedMultipleRowKeys(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        // disabled: record.fullname === 'admin',
        // Column configuration not to be checked
        // name: record.fullname,
        // }),
    };

    const handleActiveUpdateMultiple = () => {
        handleActiveMultipleConfirm(selectedMultipleRowKeys, true);
    }

    const handleInactiveUpdateMultiple = () => {
        handleActiveMultipleConfirm(selectedMultipleRowKeys, false);
    }

    const handleInactiveUpdateCancel = () => { }

    const handleActiveUpdateCancel = () => { }

    return (
        <div>
            {selectedMultipleRowKeys.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <Popconfirm
                        placement='topRight'
                        title="Xác nhận tắt hoạt động"
                        description={<span>Bạn chắc chắn muốn thực hiện<br /> thao tác này?</span>}
                        onConfirm={handleInactiveUpdateMultiple}
                        onCancel={handleInactiveUpdateCancel}
                        okText="Chắc chắn"
                        cancelText="Không"
                    >
                        <Button
                            type="primary"
                            style={{ marginRight: '15px' }}
                            danger
                        >
                            Tắt Hoạt Động
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        placement='topRight'
                        title="Xác nhận bật hoạt động"
                        description={<span>Bạn chắc chắn muốn thực hiện<br /> thao tác này?</span>}
                        onConfirm={handleActiveUpdateMultiple}
                        onCancel={handleActiveUpdateCancel}
                        okText="Chắc chắn"
                        cancelText="Không"
                    >
                        <Button
                            type="primary"
                        >
                            Bật Hoạt Động
                        </Button>
                    </Popconfirm>
                </div>
            )}
            <LoadingComponent isLoading={isLoading}>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    // components={components}
                    {...props}
                />
            </LoadingComponent>
        </div>
    )
};

export default TableComponent;
