import React from 'react';
import { useActions } from '../../../../hooks';
import { setIsChatOpen } from '../../../../store/actions/Questionnaire';

import { Icons } from '../../../../constants';
import './ChatHeader.less';

function ChatHeader() {
    const showChat = useActions(setIsChatOpen);


    return <div className='ChatHeader'>
        <div className='title'>Messages</div>
        <button onClick={() => showChat(false)} className='close-button'><Icons.CloseIcon /></button>
    </div>;
}


export default ChatHeader;
