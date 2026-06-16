import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const Toast = ({ id, message, type = 'info', onClose }) => {
  const icons = {
    success: <CheckCircle2 className="text-emerald-500" size={20} />,
    error: <AlertCircle className="text-white" size={20} />,
    info: <Info className="text-blue-500" size={20} />
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-100',
    error: 'bg-red-600 border-red-750 text-white',
    info: 'bg-blue-50 border-blue-100'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md min-w-[300px] max-w-md ${bgColors[type]}`}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold leading-tight ${type === 'error' ? 'text-white' : 'text-gray-800'}`}>
          {message}
        </p>
      </div>
      <button 
        onClick={() => onClose(id)}
        className={`flex-shrink-0 p-1 rounded-lg transition-colors ${
          type === 'error' 
            ? 'text-red-100 hover:text-white hover:bg-white/10' 
            : 'text-gray-400 hover:text-gray-600 hover:bg-black/5'
        }`}
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
