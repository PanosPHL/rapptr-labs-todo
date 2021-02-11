import React from 'react';

const HorizontalRule = () => {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <hr></hr>
      <p
        style={{
          position: 'absolute',
          top: '-10px',
          backgroundColor: 'white',
          left: window.innerWidth >= 560 ? '45.5%' : '48%',
          width: '24px',
          textAlign: 'center',
        }}
      >
        or
      </p>
    </div>
  );
};

export default HorizontalRule;
