import React, { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background:
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6",
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        zIndex: 9999,
        fontWeight: "600",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;