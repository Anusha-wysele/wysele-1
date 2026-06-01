import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', cancelText = 'Cancel' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden p-8 text-center"
          >
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-100">
              <AlertTriangle size={32} />
            </div>
            
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{title}</h3>
            <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
              {message}
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={onConfirm}
                className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-900/20 active:scale-95"
              >
                {confirmText}
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-100 transition-all active:scale-95"
              >
                {cancelText}
              </button>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-300 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
