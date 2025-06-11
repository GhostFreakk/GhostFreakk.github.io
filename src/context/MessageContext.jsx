import { createContext, useContext, useState, useCallback } from 'react';
import MessagePopup from '../components/MessagePopup';

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((message, type = 'error', duration = 3000) => {
    setMessage({ message, type, duration });
  }, []);

  const hideMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {message && (
        <MessagePopup
          message={message.message}
          type={message.type}
          duration={message.duration}
          onClose={hideMessage}
        />
      )}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
}; 