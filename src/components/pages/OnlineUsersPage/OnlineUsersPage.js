import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import api from '../../../apiSingleton';
import Button from '../../ui/Button';
import './OnlineUsersPage.less';

const { Column } = Table;

// eslint-disable-next-line max-lines-per-function
function OnlineUsersPage() {
    const [ contacts, setContacts ] = useState([]);

    async function fetchData() {
        const usersData = await api.profile.listOnlineUsers();

        console.log(usersData);
        setContacts(usersData);
    }

    useEffect(() => {
        fetchData();
    }, [ ]);

    return (
        <div>
            <div className='createDiv'>
                <span className='infoText'>Online users</span>
                <Button
                    className='createBtn'
                    type='primary'
                    htmlType='submit'
                    style={{ textAlign: 'right' }}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Create
                </Button>
            </div>

            <Table
                dataSource={contacts} pagination={false}
                scroll={{ x: true }}>
                <Column title='Id' dataIndex='id' key='id' />
                <Column title='Name' dataIndex='name' key='name' />
                <Column title='Email' dataIndex='email' key='email' />
                <Column title='Gender' dataIndex='gender' key='gender' />
            </Table>
        </div>
    );
}

export default OnlineUsersPage;
