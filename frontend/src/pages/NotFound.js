import React from 'react';

const NotFound = () => {
  return (
    <div className='d-flex justify-content-center flex-column align-items-center bg-black text-white' style={{
        width: '100vw',
        height: '100vh',
    }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;