import { Divider, Radio, Table } from 'antd';
import React, { useState } from 'react';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [], isLoading = false, components = [] } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div>
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
