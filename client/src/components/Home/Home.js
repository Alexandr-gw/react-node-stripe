import React from 'react';
import backgroundImage from '../../assets/images/intro.png';
function Home() {
  return (
    <div className="min-h-screen -my-16 flex items-center justify-center bg-cover bg-center text-white"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div>Home of many books</div>
    </div>
  );
}

export default Home;
