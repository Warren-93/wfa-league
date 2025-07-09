import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomeHeroCarousel = () => {
  return (
    <div className='container'>
        <div className="hero-section">
        
        <Carousel>
            <Carousel.Item>
            <img className="d-block w-100" src="image1.jpg" alt="First slide" />
            <Carousel.Caption>
                <h3>Latest Football News</h3>
                <p>Catch up on the latest happenings in the football world.</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img className="d-block w-100" src="image2.jpg" alt="Second slide" />
            <Carousel.Caption>
                <h3>Upcoming Fixtures</h3>
                <p>Check out the upcoming fixtures and get ready!</p>
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    </div>
  );
};

export default HomeHeroCarousel;
