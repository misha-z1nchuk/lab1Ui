import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { notification } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import DateInput from '../../../DateInput';
import Input from '../../../Input';

import './FieldsForm.less';
import { checkIsEditable } from '../../../../../utils/questionnaire';
import FieldStatusIcon from '../../../FieldStatusIcon';
import Select from '../../../Select';
import fetchers from '../../../../../utils/fetchers';
import { Icons, OPTIONS, STATUSES } from '../../../../../constants';
import PhoneInput from '../../../PhoneInput';
import Button from '../../../Button';
import Switcher from '../../../Switcher';
import Checkbox from '../../../Checkbox';
import Radio from '../../../Radio';
import JavaScript from '../../../JavaScript';
import HTML from '../../../HTML/HTML';

function getComponent(type, options) {
    const COMPONENTS = {
        STRING      : { component: Input, options },
        EMAIL       : { component: Input },
        PHONE       : { component: PhoneInput },
        PERSON_NAME : { component: Input },
        DATE        : { component : DateInput,
            options   : {
                disabledDate : currentDate => {
                    const { rules } = options;

                    if (!rules?.length) return;

                    return rules.reduce((acc, item) => {
                        if (item.iso_date?.min === 'current') return acc || currentDate < moment();
                        if (item.diff) {
                            return acc || (currentDate > moment().subtract(item.diff.amount, item.diff.unit));
                        }

                        return acc;
                    }, false);
                },
                defaultPickerValue : () => {
                    const diffRule = options.rules?.find(item => Object.keys(item).includes('diff'));

                    return diffRule && moment().subtract(diffRule.diff.amount, diffRule.diff.unit).startOf('day');
                }
            } },
        DOCUMENT_TYPE : { component: Select, options: { options: OPTIONS.getDocumentType() } },
        ENUM          : { component: Select, options: { fetcher: fetchers.fetchEnums(options?.type), ...options }  },
        BOOLEAN       : { component: Switcher },
        CHECKBOX      : { component: Checkbox },
        RADIO         : { component: Radio, options },
        JAVASCRIPT    : { component: JavaScript, options },
        HTML          : { component: HTML, options }
    };

    return COMPONENTS[type];
}

const GRID_COLUMNS = 6;
const DEFAULT_FIELD_WIDTH = 3;

/* eslint-disable max-lines-per-function */
function FieldsForm({
    sectionData,
    data = {},
    onChange,
    onBlur,
    onAddField,
    onRemoveField,
    errors = {},
    loading = {},
    collapsible
}) {
    const [ isOpened, setIsOpened ] = useState(false);
    const [ formStatus, setFormStatus ] = useState(STATUSES.PENDING);
    const [ newFieldLoading, setNewFieldLoading ] = useState(false);
    const [ fieldDeleteLoading, setFieldDeleteLoading ] = useState({});
    const [ subSectionMap, setSubSectionMap ] = useState({});

    const fields = Object.keys(data.fields).filter(field => data.fields[field].section === sectionData.id);
    const subForms = data.sections.filter(item => item.parent_id === sectionData.id);
    const isParentMultiple = data.sections.find(item => item.id === sectionData.parent_id)?.type === 'MULTIPLE';

    useEffect(() => {
        parseFormStatus();
    }, [ data.status ]);

    function parseFormStatus() {
        let newStatus = STATUSES.ACCEPTED;
        const fieldsList = subForms.length ?
            Object.keys(data.fields)
                .filter(field =>
                    [ sectionData.id, ...subForms.map(item => item.id) ].includes(data.fields[field].section))
            : fields;

        fieldsList.forEach(item => {
            const fieldStatus = data.fields[item].status;

            if (fieldStatus === STATUSES.PENDING && newStatus !== STATUSES.REJECTED) newStatus = STATUSES.PENDING;
            if (fieldStatus === STATUSES.REJECTED) newStatus = STATUSES.REJECTED;
        });

        if (newStatus !== STATUSES.ACCEPTED && ![ STATUSES.ACCEPTED, STATUSES.REJECTED ].includes(data.status)) {
            setIsOpened(true);
        } else setIsOpened(false);

        setFormStatus(newStatus);
    }

    function handleCollapseToggle() {
        setIsOpened(!isOpened);
    }

    function handleAddField(field) {
        return async () => {
            try {
                setNewFieldLoading(true);
                await onAddField(field);
                setNewFieldLoading(false);
            } catch (err) {
                notification.error({ message: err.error_message });
            }
        };
    }

    function handleRemoveField(field, id) {
        return async () => {
            try {
                setFieldDeleteLoading({ ...fieldDeleteLoading, [id]: true });
                await onRemoveField(field, id);
                setFieldDeleteLoading({ ...fieldDeleteLoading, [id]: false });
            } catch (err) {
                notification.error({ message: err.error_message });
            }
        };
    }

    function renderFields(fieldsList) {
        return fieldsList.map((field, index) => {
            const fieldData = data.fields[field];
            const { component: Component, options = {} } = getComponent(fieldData.type, fieldData.options);
            const spans = sectionData.layout.reduce((acc, item) =>
                [ ...acc, ...Array(item).fill(Math.floor(GRID_COLUMNS / item)) ], []);

            return (
                <div
                    id={`form_field_${field}`}
                    style={{ gridColumn: `span ${spans[index] || DEFAULT_FIELD_WIDTH}` }} key={fieldData.id}
                    className={classNames('formField', { fieldWithError: errors[field] })}>
                    <Component
                        {...options}
                        name={field}
                        label={fieldData.name}
                        value={fieldData.value}
                        onChange={onChange}
                        error={errors[field]}
                        onBlur={() => onBlur(field, fieldData.type === 'PHONE' ? fieldData.value?.replace(/\D/g, '') : fieldData.value)}
                        asterisk={fieldData.asterisk}
                        required={fieldData.required}
                        disabled={!checkIsEditable(data.status, fieldData.status)}
                        labelSuffix={(
                            <FieldStatusIcon status={fieldData.status} comment={fieldData.reject_comment} />
                        )}
                        loading={!!loading[field]}
                        className={classNames({ rejectedField: fieldData.status === STATUSES.REJECTED })}
                    />
                </div>
            );
        });
    }

    function renderBody() {
        if (sectionData.type === 'MULTIPLE') {
            const handleToggleSubSection = (item) => {
                setSubSectionMap((prev) => {
                    return { ...prev, [item]: !prev[item] };
                });
            };


            return (
                <>
                    {sectionData.items_ids.map(({ id: item }, index) => {
                        const subSectionIsOpened = subSectionMap[item];


                        return (
                            <div className='subForm' key={item}>
                                <div className='titleWithDelete'>
                                    <h3 className='formSectionTitle' onClick={() => handleToggleSubSection(item)}>
                                        {sectionData.child_name} #{index + 1}
                                        <div className={classNames('collapseIcon', { isOpened: subSectionIsOpened })}><Icons.CollapseIcon /></div>
                                    </h3>
                                    {!!index && data.status === STATUSES.DRAFT &&
                                    <Button
                                        type='danger'
                                        className='removeBtn'
                                        onClick={handleRemoveField(sectionData.field, item)}
                                        loading={fieldDeleteLoading[item]}
                                    >{!fieldDeleteLoading[item] && <DeleteOutlined />}</Button>
                                    }
                                </div>
                                {subSectionIsOpened && subForms.map(subSection => {
                                    const fieldsList = Object.keys(data.fields)
                                        .filter(field => (data.fields[field].section === subSection.id)
                                    && field.includes(item.toString()));

                                    return (
                                        <div className={'form-body'}>
                                            {renderFields(fieldsList)}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                    {data.status === STATUSES.DRAFT && <div className={classNames('addItemButton', { loading: newFieldLoading })} onClick={handleAddField(sectionData.field)}>
                        {newFieldLoading && <LoadingOutlined />}
                        Add {sectionData.child_name}
                        <Icons.AddDocumentIcon />
                    </div>}
                </>
            );
        }

        return (
            <div className={'form-body'}>
                {renderFields(fields)}
            </div>
        );
    }

    return (
        <>
            {!isParentMultiple &&
                <div className='FieldsForm'>
                    <h3 className={classNames('formSectionTitle')}  onClick={handleCollapseToggle}>
                        <div className={classNames('title', { mainTitle: !sectionData.parent_id })}>
                            {formStatus === STATUSES.ACCEPTED && <Icons.AcceptBlock />}
                            {formStatus === STATUSES.REJECTED && <Icons.RejectBlock />}
                            {sectionData.name}
                        </div>
                        {collapsible && <div className={classNames('collapseIcon', { isOpened })}><Icons.CollapseIcon /></div>}
                    </h3>

                    {sectionData.description && <div className={classNames('description')}>{sectionData.description}</div>}

                    {(!collapsible || (collapsible && isOpened)) && renderBody()}
                </div>
            }
        </>
    );
}

FieldsForm.propTypes = {
    sectionData   : PropTypes.object,
    fields        : PropTypes.array,
    data          : PropTypes.object,
    onChange      : PropTypes.func,
    errors        : PropTypes.object,
    onBlur        : PropTypes.func,
    loading       : PropTypes.object,
    collapsible   : PropTypes.bool,
    onAddField    : PropTypes.func,
    onRemoveField : PropTypes.func
};

export default FieldsForm;
