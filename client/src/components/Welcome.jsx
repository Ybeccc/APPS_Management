import React from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className='title'>Hai</h1>
      <h2 className='subtitle'>
        Selamat Datang <strong>{user && user.data ? user.data.usrFullName : 'Guest'}</strong>
      </h2>
    </div>
  );
}

export default Welcome;