import React, { useEffect, useState } from 'react';
import { Space, Table, Input } from 'antd'; // Import Input from Ant Design
import api from '../../../apiSingleton';
import ProductModal from '../../ui/Modals/ProductModal/ProductModal';
import Button from '../../ui/Button';
import './ContactsPage.less';
import CreateContactModal from '../../ui/Modals/CreateContactModal/CreateContactModal';

const { Column } = Table;

// eslint-disable-next-line max-lines-per-function
function ContactsPage() {
    const [ contacts, setContacts ] = useState([]);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);
    const [ contact, setContact ] = useState({});
    const [ queryParams, setQueryParams ] = useState({ search: '', sortBy: 'createdAt', orderBy: 'DESC' });

    async function fetchData() {
        const contactsData = await api.contacts.list(queryParams);

        setContacts(contactsData);
    }

    useEffect(() => {
        fetchData();
    }, [ queryParams.search, queryParams.sortBy, queryParams.orderBy ]);

    async function handeUpdate(data) {
        await api.contacts.update(data.id, data);
        setIsOpen(false);
        fetchData();
    }

    async function handeCreate(data) {
        await api.contacts.create(data);
        setIsCreateModalOpen(false);
        fetchData();
    }

    async function handeDelete(id) {
        await api.contacts.delete(id);
        fetchData();
    }

    function handleTableOnChange(p, f, sorter) {
        const { columnKey, order } = sorter;
        const mapOrder = { descend: 'DESC', ascend: 'ASC' };

        setQueryParams((prev) => ({ ...prev, sortBy: columnKey, orderBy: mapOrder[order] }));
    }

    return (
        <div>
            <div className='createDiv'>
                <span className='infoText'>Managing contacts</span>
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
                dataSource={contacts} pagination={false} onChange={handleTableOnChange}
                scroll={{ x: true }}>
                <Column
                    title='First Name' dataIndex='firstName' key='firstName'
                    sorter />
                <Column
                    title='Last Name' dataIndex='lastName' key='lastName'
                    sorter />
                <Column title='Phone' dataIndex='phone' key='phone' />
                <Column title='createdAt' dataIndex='createdAt' key='createdAt' />
                <Column
                    title='Action'
                    key='action'
                    render={(_, record) => (
                        <Space size='middle'>
                            <a
                                onClick={() => {
                                    setContact(record);
                                    setIsOpen(true);
                                }}
                            >
                                Edit
                            </a>
                            <a
                                onClick={() => {
                                    handeDelete(record.id);
                                }}
                            >
                                Delete
                            </a>
                        </Space>
                    )}
                />
            </Table>
            <ProductModal
                isOpen={isOpen} contactData={contact} onClose={() => setIsOpen(false)}
                onOk={handeUpdate} />
            <CreateContactModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onOk={handeCreate}
            />
        </div>
    );
}

export default ContactsPage;
