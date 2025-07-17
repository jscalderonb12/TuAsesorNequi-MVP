// src/components/PhoneFrame.tsx
import React from 'react';
import './styles.css'; // estilos aparte para mantener limpio

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="phone-frame-container">
      <div className="phone-frame">{children}</div>
    </div>
  );
};

export default PhoneFrame;
