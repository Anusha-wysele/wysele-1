import { AnimatePresence } from 'framer-motion';
import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import Toast from './Toast';

const ToastContext = createContext(null);

let globalShowToast = null;

export const showToast = (message, type = 'info') => {
  if (globalShowToast) {
    globalShowToast(message, type);
  } else {
    console.warn('ToastProvider not mounted. Message:', message);
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  useEffect(() => {
    globalShowToast = addToast;
    return () => {
      globalShowToast = null;
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ showToast: addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => (
              <Toast 
                key={toast.id} 
                {...toast} 
                onClose={removeToast} 
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

