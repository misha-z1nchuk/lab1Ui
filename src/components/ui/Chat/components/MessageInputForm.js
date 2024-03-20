import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Upload } from 'antd';
import { Icons } from '../../../../constants';
import './MessageInputForm.less';
import Button from '../../Button';

function MessageInputForm({ onSendMessage, onSendFile, showUpload }) {
    const [ message, setMessage ] = useState('');
    const [ fileUploading, setFileUploading ] = useState(false);

    const uploadProps = {
        accept       : '.jpg,.pdf,.png',
        beforeUpload : async (file) => {
            if (!onSendFile) return;
            setFileUploading(true);
            await onSendFile(file);
            setFileUploading(false);

            return false;
        },
        showUploadList : false
    };

    function onSendMessageHandler() {
        onSendMessage({ body: message.trim() });
        setMessage('');
    }

    function handleEnterPress(e) {
        if (!e.shiftKey) {
            e.preventDefault();

            onSendMessageHandler();
        }
    }

    return (
        <div className='MessageInputForm'>

            <div className='message-input-wrapper'>
                <Input.TextArea
                    onPressEnter={handleEnterPress}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    placeholder='Enter a message'
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    className='message-input-textarea'
                />
                <div className='control-buttons-wrapper'>
                    {showUpload && <Upload {...uploadProps}>
                        <Button
                            className='chatUpload'
                            icon={<Icons.PaperClipIcon />}
                            disabled={fileUploading}
                        />
                    </Upload>}
                    <button onClick={onSendMessageHandler} className='send-button'><Icons.MessageSend />
                    </button>
                </div>
            </div>

        </div>
    );
}

MessageInputForm.propTypes = {
    onSendMessage : PropTypes.func,
    onSendFile    : PropTypes.func,
    showUpload    : PropTypes.bool
};

export default MessageInputForm;
