import React from 'react';
import { Table } from 'antd';
import { useUser } from '../../../hooks';

function ProfilePage() {
    const user = useUser() || { };

    // Define columns for the table
    const columns = [
        {
            title     : 'Attribute',
            dataIndex : 'attribute',
            key       : 'attribute'
        },
        {
            title     : 'Value',
            dataIndex : 'value',
            key       : 'value'
        }
    ];

    // Prepare data for the table
    const data = [
        {
            key       : 'id',
            attribute : 'ID',
            value     : user.id
        },
        {
            key       : 'name',
            attribute : 'Name',
            value     : user.name
        },
        {
            key       : 'gender',
            attribute : 'Gender',
            value     : user.gender || 'N/A'
        },
        {
            key       : 'email',
            attribute : 'Email',
            value     : user.email
        },
        {
            key       : 'birthDate',
            attribute : 'Birth Date',
            value     : user.birthDate
        }
    ];

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <span><b>Profile page</b></span>
            <Table
                style={{ marginTop: '10px' }} columns={columns} dataSource={data}
                pagination={false} />
        </div>
    );
}

export default ProfilePage;
