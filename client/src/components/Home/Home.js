import React from 'react';
import backgroundImage from '../../assets/images/intro.png';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div
      className="min-h-screen -my-16 mb-0 flex items-center justify-center bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 color-">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg md:text-xl mb-8 font-serif">
          Step into a world of handpicked books, timeless classics, and new releases curated by readers, for readers.
        </p>
        <Link to="/BooksList" className="inline-block bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-all">Shop Now</Link>
      </div>
    </div>
  );
}

export default Home;
