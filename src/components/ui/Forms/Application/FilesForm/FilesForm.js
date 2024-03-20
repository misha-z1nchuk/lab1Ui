import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { notification } from 'antd';
import classNames from 'classnames';
import { FILE_SUBTYPES, Icons, STATUSES } from '../../../../../constants';

import './FilesForm.less';
import Input from '../../../Input';
import FileUpload from '../../../FileUpload';

/* eslint-disable max-lines-per-function */

function FilesForm({
    filesList = [],
    formStatus,
    onDocumentDelete,
    onDocumentCreate,
    onDocumentUpdate,
    onFileUpload,
    onFileDelete,
    additional,
    title
}) {
    const { t } = useTranslation();

    const [ isCreating, setIsCreating ] = useState(false);
    const [ isOpened, setIsOpened ] = useState(![ STATUSES.ACCEPTED, STATUSES.REJECTED ].includes(formStatus));
    const [ status, setStatus ] = useState(STATUSES.PENDING);
    const [ additionalNames, setAdditionalNames ] = useState({});

    const requiredDocuments = filesList.filter(file => file.type === FILE_SUBTYPES.APPLICATION.MAIN && file.required);
    const optionalDocuments = filesList.filter(file => file.type === FILE_SUBTYPES.APPLICATION.MAIN && !file.required);
    const additionalDocuments = filesList.filter(file => file.type === FILE_SUBTYPES.APPLICATION.ADDITIONAL);

    useEffect(() => {
        let newStatus = STATUSES.ACCEPTED;

        filesList.forEach(item => {
            const fileStatus = item.status;

            if (fileStatus === STATUSES.PENDING && newStatus !== STATUSES.REJECTED) newStatus = STATUSES.PENDING;
            if (fileStatus === STATUSES.REJECTED) newStatus = STATUSES.REJECTED;
        });

        setStatus(newStatus);

        if (newStatus === STATUSES.ACCEPTED) setIsOpened(false);
    }, [ formStatus ]);

    useEffect(() => {
        const names = additionalDocuments.reduce((acc, item) => ({ ...acc, [item.id]: item.name }), {});

        setAdditionalNames(names);
    }, [ filesList ]);

    async function handleCreateFile() {
        if (isCreating) return;
        setIsCreating(true);
        await onDocumentCreate();
        setIsCreating(false);
    }

    function handleDeleteDocument(id) {
        return async () => {
            try {
                await onDocumentDelete(id);
            } catch (err) {
                notification.error({ message: err.error_message });
            }
        };
    }

    function handleDeleteFile(id) {
        return async () => {
            try {
                await onFileDelete(id);
            } catch (err) {
                notification.error({ message: err.error_message });
            }
        };
    }

    function handleChangeName(id) {
        return async (name, value) => {
            try {
                await onDocumentUpdate(id, { [name]: value });
            } catch (err) {
                notification.error({ message: err.error_message });
            }
        };
    }

    function handleFileUpload(id) {
        return async (name, value) => {
            try {
                const formData = new FormData();

                formData.append(name, value);

                await onFileUpload(id, formData);
            } catch (err) {
                let message = err.error_message;

                if (err?.errors?.[0]?.code?.size === 'TOO_HIGH') {
                    message = 'File size is too large';
                }

                notification.error({ message });
            }
        };
    }

    function handleCollapseToggle() {
        setIsOpened(!isOpened);
    }

    function renderFileInputs(list, isAdditional) {
        return (
            <div className='fileInputsList'>
                {list.map(item => {
                    return (
                        <div key={item.id} id={item.id} className='fileInputs'>
                            {isAdditional ?
                                <Input
                                    name='name'
                                    label='Document title'
                                    value={additionalNames[item.id]}
                                    onChange={(_, val) => {
                                        setAdditionalNames({ ...additionalNames, [item.id]: val });
                                    }}
                                    onBlur={handleChangeName(item.id)}
                                    disabled={![ STATUSES.DRAFT, STATUSES.REWORK ].includes(formStatus)}
                                />
                                :
                                <div className='fileTitle'>
                                    {item.name}
                                </div>
                            }
                            <FileUpload
                                name='file'
                                onUpload={handleFileUpload(item.id)}
                                fileData={item}
                                onFileDelete={handleDeleteFile(item.id)}
                                onDocumentDelete={handleDeleteDocument(item.id)}
                                disabled={![ STATUSES.DRAFT, STATUSES.REWORK ].includes(formStatus)}
                                canBeDeleted={isAdditional && [ STATUSES.DRAFT, STATUSES.REWORK ].includes(formStatus)
                                    && item.status !== STATUSES.ACCEPTED}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    function renderRequired() {
        return (
            <div className='requiredBlock'>
                <h4 className='filesSubtitle'>Required documents</h4>
                {renderFileInputs(requiredDocuments)}
            </div>
        );
    }

    function renderOptional() {
        return (
            <div className='optionalBlock'>
                <h4 className='filesSubtitle'>Optional documents</h4>
                {renderFileInputs(optionalDocuments)}
            </div>
        );
    }

    function renderAdditional() {
        return (
            <div className='optionalBlock'>
                {([ STATUSES.DRAFT, STATUSES.REWORK ].includes(formStatus) || !!additionalDocuments.length) && <h4 className='filesSubtitle'>Additional documents</h4>}
                {renderFileInputs(additionalDocuments, true)}
                {[ STATUSES.DRAFT, STATUSES.REWORK ].includes(formStatus) && <div className={classNames('fileModalButton', { isCreating })} onClick={handleCreateFile}>
                    {t('cruder.button.addDocument')}
                    <Icons.AddDocumentIcon />
                </div>}
            </div>
        );
    }

    return (
        <div className='FilesForm'>
            <h3 className={classNames('formSectionTitle')} onClick={handleCollapseToggle}>
                <div className={'title'}>
                    {status === STATUSES.ACCEPTED && <Icons.AcceptBlock />}
                    {status === STATUSES.REJECTED && <Icons.RejectBlock />}
                    {title}
                </div>
                {<div className={classNames('collapseIcon', { isOpened })}><Icons.CollapseIcon /></div>}
            </h3>
            {(isOpened) &&
            <>
                {!!requiredDocuments.length && renderRequired()}
                {!!optionalDocuments.length && renderOptional()}
                {additional && renderAdditional()}
            </>
            }
        </div>
    );
}

FilesForm.propTypes = {
    filesList        : PropTypes.array,
    formStatus       : PropTypes.string,
    onDocumentDelete : PropTypes.func,
    onDocumentCreate : PropTypes.func,
    onDocumentUpdate : PropTypes.func,
    onFileUpload     : PropTypes.func,
    onFileDelete     : PropTypes.func,
    additional       : PropTypes.bool,
    title            : PropTypes.string
};

export default FilesForm;
