import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-3">
      <div className="container text-center">
        <p>&copy; 2024 Football League. All rights reserved.</p>
        <p>Follow us on social media</p>
        <div>
          <a href="#" className="text-white mr-2">Facebook  </a>
          <a href="#" className="text-white mr-2">Youtube   </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
