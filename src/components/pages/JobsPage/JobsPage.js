import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd'; // Import Input from Ant Design
import api from '../../../apiSingleton';
import './JobsPage.less';
import { useWebSocket } from '../../../hooks/useWs';

const { Column } = Table;

// eslint-disable-next-line max-lines-per-function
function JobsPage() {
    const [ jobs, setJobs ] = useState([]);
    const [ queryParams, setQueryParams ] = useState({ search: '', sortBy: 'createdAt', orderBy: 'DESC' });

    const { lastMessage } = useWebSocket();

    async function fetchData() {
        const contactsData = await api.jobs.list(queryParams);

        setJobs(contactsData);
    }

    useEffect(() => {
        fetchData();
    }, [ queryParams.search, queryParams.sortBy, queryParams.orderBy ]);

    useEffect(() => {
        if (lastMessage?.type === 'new_job') {
            fetchData();
        }
    }, [ lastMessage ]);

    function handleTableOnChange(p, f, sorter) {
        const { columnKey, order } = sorter;
        const mapOrder = { descend: 'DESC', ascend: 'ASC' };

        setQueryParams((prev) => ({ ...prev, sortBy: columnKey, orderBy: mapOrder[order] }));
    }

    return (
        <div>
            <div className='filters'>
                <div>
                    <Input
                        value={queryParams.search}
                        onChange={(e) => {
                            setQueryParams((prev) => ({ ...prev, search: e.target.value }));
                        }}
                        placeholder={'search'}
                    />
                </div>
            </div>

            <Table
                rowKey={'id'}
                dataSource={jobs} pagination={false} onChange={handleTableOnChange}
                scroll={{ x: true }}>
                <Column
                    title='Id' dataIndex='id' key='id'
                    sorter />
                <Column
                    title='Type' dataIndex='type' key='type'
                    sorter />
                <Column
                    title='Status' dataIndex='status' key='status'
                    sorter />
                <Column
                    title='Data' dataIndex='data' key='data'
                    sorter />
                <Column
                    title='Result' dataIndex='result' key='result'
                    sorter />
                <Column title='createdAt' dataIndex='createdAt' key='createdAt' />
            </Table>
        </div>
    );
}

export default JobsPage;
