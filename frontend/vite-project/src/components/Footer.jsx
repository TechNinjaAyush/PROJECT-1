import React from "react";
import "./Contact.css" ; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
            Welcome to Quizzer, a cutting-edge quiz application designed to
              test your knowledge and skills. Our mission is to provide a fun and
              engaging platform for users to challenge themselves and learn new
              things. With a vast range of categories and difficulty levels, our
              quiz app is perfect for anyone looking to improve their cognitive
              abilities or simply have a good time.

            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Get in Touch</h5>
            <p>
              <i className="fas fa-map-marker-alt"></i> 123 Main St, Anytown,
              USA
            </p>
            <p>
              <i className="fas fa-phone"></i> 8856885484
            </p>
            <p>
              <i className="fas fa-envelope"></i> [info@example.com](mailto:ayushkhairnar06@gmail.com)
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="copyright">
              &copy; {new Date().getFullYear()} Example Company. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;