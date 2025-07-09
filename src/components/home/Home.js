import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeHeroCarousel from './homeHeroCarousel/HomeHeroCarousel';
import HomeNews from './homeNews/HomeNews';
import HomeFixture from './homeFixture/HomeFixture';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    
    <div>
      <Container>
      <section id="hero" className="container-fluid  py-5">
        <HomeHeroCarousel/>

      </section>

      <section id="latest-fixtures" className="container py-5">
          <HomeFixture/>

      </section>

      <section id="latest-news" className="container py-5">
        <HomeNews />
      </section>
      </Container>
    </div>
  );
}

export default Home;