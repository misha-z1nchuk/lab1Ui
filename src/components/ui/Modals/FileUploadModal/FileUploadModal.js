/* eslint-disable max-lines-per-function */
import { Form, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';

import './FileUploadModal.less';
import { Icons } from '../../../../constants';
import InputType from '../../Input/Input';

function FileUploadModal({ onClose, onSubmit }) {
    const { t } = useTranslation();
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ fileList, setFileList ] = useState([]);
    const [ errors, setErrors ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);

    function handleTitleChange(field, value) {
        setName(value);
    }

    function handleCommentChange(field, value) {
        setDescription(value);
    }

    async function handleSubmit() {
        setIsLoading(true);
        try {
            const formData = new FormData();

            formData.append('file', fileList[0]);
            formData.append('type', 'APPLICATION');
            formData.append('subType', 'ADDITIONAL');
            formData.append('name', name);
            formData.append('description', description);

            await onSubmit(formData);
            setIsLoading(false);
            onClose();
        } catch (err) {
            setIsLoading(false);
            setErrors(err);
        }
    }

    function renderFooter() {
        return (
            <>
                <Button
                    key       = 'cancel'
                    onClick={onClose}
                    className = 'cancel-btn'
                    type='secondary'
                >
                    {t('cruder.button.close')}
                </Button>
                <Button
                    key='submit'
                    onClick={handleSubmit}
                    loading={isLoading}
                    className={'submit-btn'}
                    type='primary'
                >
                    {t('cruder.button.upload')}
                </Button>
            </>
        );
    }

    const props = {
        accept   : '.jpg,.pdf,.png',
        listType : 'picture',
        onRemove : () => {
            setFileList([]);
        },
        beforeUpload : (file) => {
            setFileList([ file ]);

            return false;
        },
        fileList
    };

    return (
        <Modal
            centered
            destroyOnClose
            width        = {480}
            open
            closable = {false}
            maskClosable={false}
            className='FileUploadModal'
            footer       = {renderFooter()}
            title = {t('modal.title.addNewFile')}
            onCancel={onClose}
            onOk={onSubmit}
        >
            <InputType
                label={t('cruder.table.label.documentTitle')}
                required
                error={errors.name}
                value={name}
                onChange={handleTitleChange}
            />
            <InputType
                label={t('cruder.table.label.documentComment')}
                error={errors.description}
                value={description}
                onChange={handleCommentChange}
            />
            <Form.Item
                className      = 'CRUDER_FormInput'
                validateStatus = {errors.file ? 'error' : undefined}
                help           = {errors.file}
            >
                <Upload {...props}>
                    {!fileList.length && <Button className='uploadField' icon={<Icons.PaperClipIcon />}> {t('cruder.button.attachFile')}</Button>}
                </Upload>
            </Form.Item>
        </Modal>
    );
}

FileUploadModal.propTypes = {
    isOpen    : PropTypes.bool,
    onClose   : PropTypes.func,
    onSubmit  : PropTypes.func,
    isLoading : PropTypes.bool,
    error     : PropTypes.object
};

export default FileUploadModal;
