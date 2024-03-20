import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import DateInput from '../../../DateInput';
import Input from '../../../Input';

import './FieldsForm.less';
import Select from '../../../Select';
import fetchers from '../../../../../utils/fetchers';
import { Icons, OPTIONS } from '../../../../../constants';
import PhoneInput from '../../../PhoneInput';
import Checkbox from '../../../Checkbox';
import Radio from '../../../Radio';
import JavaScript from '../../../JavaScript';
import HTML from '../../../HTML/HTML';

function getComponent(type, options) {
    const COMPONENTS = {
        STRING        : { component: Input },
        EMAIL         : { component: Input },
        PHONE         : { component: PhoneInput },
        PERSON_NAME   : { component: Input },
        DATE          : { component: DateInput },
        BIRTH_DATE    : { component: DateInput, options: { disabledDate: currentDate => currentDate > moment() } },
        DOCUMENT_TYPE : { component: Select, options: { options: OPTIONS.getDocumentType() } },
        ENUM          : { component: Select, options: { fetcher: fetchers.fetchEnums(options?.type), ...options } },
        CHECKBOX      : { component: Checkbox },
        RADIO         : { component: Radio },
        JAVASCRIPT    : { component: JavaScript },
        HTML          : { component: HTML, options }
    };

    return COMPONENTS[type];
}

const GRID_COLUMNS = 6;
const DEFAULT_FIELD_WIDTH = 3;

/* eslint-disable max-lines-per-function */
function FieldsForm({
    onChange,
    data,
    schema,
    collapsible
}) {
    const [ isOpened, setIsOpened ] = useState(true);

    function handleCollapseToggle() {
        setIsOpened(!isOpened);
    }

    function renderFields(fieldsList) {
        return fieldsList.map((field, index) => {
            const { component: Component, options = {} } = getComponent(field.type, field.options);
            const spans = schema.layout?.reduce((acc, item) =>
                [ ...acc, ...Array(item).fill(GRID_COLUMNS / item) ], []);


            return (
                <div
                    id={`form_field_${field.field}`}
                    style={{ gridColumn: `span ${spans?.[index] || DEFAULT_FIELD_WIDTH}` }} key={field.field}
                    className={classNames('formField')}>
                    <Component
                        {...options}
                        {...field.options}
                        onChange={onChange}
                        value={data[field.field]}
                        name={field.field}
                        label={field.name}
                        required={field.asterisk}
                    />
                </div>
            );
        });
    }

    function renderBody() {
        if (schema.type === 'MULTIPLE') {
            return (
                <>
                    <div className='subForm'>
                        <h3 className='subFormTitle'>
                            {schema.name} #1
                        </h3>
                        {schema.sections.map(subSection => {
                            return (
                                <>
                                    <h3 className={'subSectionTitle'}>
                                        <div className={'title'}>
                                            {subSection.name}
                                        </div>
                                    </h3>
                                    <div className={'form-body'}>
                                        {renderFields(subSection.fields)}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div className={classNames('addItemButton')}>
                        Add {schema.name}
                        <Icons.AddDocumentIcon />
                    </div>
                </>
            );
        }

        return (
            <div className={'form-body'}>
                {renderFields(schema.fields)}
            </div>
        );
    }

    return (
        <div className='FieldsForm'>
            <h3 className={classNames('formSectionTitle')}  onClick={handleCollapseToggle}>
                <div className={'title'}>
                    {schema.name}
                </div>
                {collapsible && <div className={classNames('collapseIcon', { isOpened })}><Icons.CollapseIcon /></div>}
            </h3>

            {(!collapsible || (collapsible && isOpened)) && renderBody()}
        </div>
    );
}

FieldsForm.propTypes = {
    schema      : PropTypes.object,
    data        : PropTypes.object,
    collapsible : PropTypes.bool,
    onChange    : PropTypes.func
};

export default FieldsForm;
