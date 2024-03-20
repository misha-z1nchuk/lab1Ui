import { LoadingOutlined } from '@ant-design/icons';
import { Form, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Icons } from '../../../constants';
import { formatBytes } from '../../../utils/helpers';
import Button from '../Button';
import FieldStatusIcon from '../FieldStatusIcon';

import './FileUpload.less';

function FileUpload({ name, onUpload, fileData, onDocumentDelete, onFileDelete, canBeDeleted, disabled }) {
    const { t } = useTranslation();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ showAttachButton, setShowAttachButton ] = useState(!fileData.size);

    useEffect(() => {
        setShowAttachButton(!fileData.size);
    }, [ fileData ]);

    const uploadProps = {
        accept       : '.jpg,.pdf,.png',
        beforeUpload : async (file) => {
            setIsLoading(true);
            await onUpload(name, file);
            setIsLoading(false);

            return false;
        }
    };

    async function handleRemoveFile() {
        setIsDeleting(true);
        await onFileDelete();
        setIsDeleting(false);
    }

    async function handleDelete() {
        setIsDeleting(true);
        await onDocumentDelete();
        setIsDeleting(false);
    }

    return (
        <div className='fileUpload'>
            <Form.Item
                className      = 'CRUDER_FormInput'
                // validateStatus = {errors.file ? 'error' : undefined}
                // help           = {errors.file}
            >
                <div className='uploadWrapper'>
                    {!showAttachButton ?
                        <div className='fileValue'>
                            <span className='name'>{fileData.file_name}</span>
                            <div className='control'>
                                <FieldStatusIcon status={fileData.status} comment={fileData.reject_comment} />
                                <span className='size'>{formatBytes(fileData.size, 1)}</span>
                                {!disabled && (isDeleting ? <LoadingOutlined /> : <div className='delete' onClick={handleRemoveFile}><Icons.CloseIcon /></div>)}
                            </div>
                        </div>
                        :
                        <>
                            <Upload {...uploadProps}>
                                <Button
                                    className='uploadField'
                                    icon={!isLoading && <Icons.PaperClipIcon />}
                                    loading={isLoading}
                                    disabled={disabled}> {t('cruder.button.attachFile')} <FieldStatusIcon status={fileData.status} comment={fileData.reject_comment} /></Button>
                            </Upload>
                            {canBeDeleted && <div className='controlButton'>
                                {(isDeleting ? <LoadingOutlined /> : <div className='delete' onClick={handleDelete}><Icons.CloseIcon /></div>)}
                            </div>}
                        </>
                    }
                </div>
            </Form.Item>
        </div>
    );
}

FileUpload.propTypes = {
    name             : PropTypes.string,
    onUpload         : PropTypes.func,
    fileData         : PropTypes.object,
    onDocumentDelete : PropTypes.func,
    onFileDelete     : PropTypes.func,
    canBeDeleted     : PropTypes.bool,
    disabled         : PropTypes.bool
};

export default FileUpload;
