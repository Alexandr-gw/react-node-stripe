import React from 'react';
import backgroundImage from '../../assets/images/intro.png';
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      Home of many books
    </div>
  );
}

export default Home;
