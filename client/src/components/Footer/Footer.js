import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 my-auto">
            <div className="container mx-auto px-4 flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <h4 className="font-semibold text-lg mb-3">Navigation</h4>
                    <nav className="space-y-2">
                        <Link to="/" className="hover:underline block">Home</Link>
                        <Link to="/BooksList" className="hover:underline block">Shop</Link>
                        <Link to="/Cart" className="hover:underline block">Cart</Link>
                    </nav>
                </div>
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <h4 className="font-semibold text-lg mb-3">Contact</h4>
                    <p>Email: support@example.com</p>
                    <p>Phone: +1 234 567 890</p>
                </div>
            </div>
            <div className="text-center mt-6 border-t border-gray-700 pt-4">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;