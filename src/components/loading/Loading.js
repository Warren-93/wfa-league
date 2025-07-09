
import React from 'react';

const Loading = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
        color: 'white'
      }}>
        <p>Loading...</p>
        <div style={{
          border: '4px solid rgba(100, 100, 100, 0.1)',
          borderRadius: '50%',
          borderTop: '4px solid #000',
          width: '24px',
          height: '24px',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    </div>
  );
};

export default Loading;
