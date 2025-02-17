import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const HeroAds = () => (
  <Carousel autoplay={{
    dotDuration: true,
  }}
  autoplaySpeed={5000}>
    <div>
      <h3 style={contentStyle}>80% Black Friday Sales! </h3>
    </div>
    <div>
      <h3 style={contentStyle}>Discover New Products!</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Instant Delivery!</h3>
    </div>
    <div>
      <h3 style={contentStyle}>Chat Support 24/7</h3>
    </div>
  </Carousel>
);
export default HeroAds;