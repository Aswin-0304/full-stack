import React, { useEffect } from 'react';

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ⓘ',
  };

  return (
    <div className={`toast ${type}`}>
      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {iconMap[type]}
      </span>
      <span>{message}</span>
    </div>
  );
}

export default Toast;
