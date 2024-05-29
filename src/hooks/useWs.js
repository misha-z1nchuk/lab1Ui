
import React, { createContext, useContext } from 'react';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ ws, lastMessage, children }) => {
    return (
        <WebSocketContext.Provider value={{ ws, lastMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
