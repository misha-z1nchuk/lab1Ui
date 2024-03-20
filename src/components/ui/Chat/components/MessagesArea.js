import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import PulseLoader from 'react-spinners/PulseLoader';
import { usePrevious } from '../../../../hooks';
import MessageItem from './MessageItem';
import FileItem from './FileItem';

function MessagesArea({ messages, additionalData, isLoading, onEdit, onScrollToTop, isAllMessagesLoaded }) {
    const previousMessages = usePrevious(messages);
    const crollToMe = useRef();

    function executeScroll() {
        crollToMe.current.scrollIntoView();
    }

    function checkIsEditable(message) {
        return !message.admin_id;
    }

    function onScroll(evt) {
        if (isAllMessagesLoaded) {
            return;
        }

        const target = evt.target;


        if (target.scrollTop === 0) {
            onScrollToTop();
            target.scrollTop = 100;
        }
    }


    useEffect(() => {
        const lastMessageId = messages[messages.length - 1]?.id;
        const previosLastMessageId = previousMessages && previousMessages[previousMessages.length - 1]?.id;

        if (lastMessageId !== previosLastMessageId) {
            executeScroll();
        }
    }, [ messages ]);


    return (
        <div onScroll={onScroll} className='MessagesArea'>
            {messages.map(item => {
                return item.type === 'ATTACHMENT' ?
                    <FileItem
                        message={item} additionalData={additionalData}
                    />
                    :
                    <MessageItem
                        message={item} editable={checkIsEditable(item)} onEdit={onEdit}
                        key={item.id}
                    />;
            })}
            {isLoading && <div className='loader-wrapper'>
                <PulseLoader size={5} color='#9FA2B0' />
            </div>}
            <div ref={crollToMe} />

        </div>
    );
}

MessagesArea.propTypes = {
    messages            : PropTypes.arrayOf(PropTypes.object),
    isLoading           : PropTypes.bool,
    onEdit              : PropTypes.func,
    onScrollToTop       : PropTypes.func,
    isAllMessagesLoaded : PropTypes.bool,
    additionalData      : PropTypes.object
};

export default MessagesArea;
