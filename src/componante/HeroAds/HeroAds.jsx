import React from 'react';
import { Carousel } from 'antd';
import ad1 from "../../assets/1.jpg"
import ad2 from "../../assets/2.jpg"
import ad3 from "../../assets/3.jpg"

const contentStyle = {
  height: '500px',
  // color: '#fff',
  // lineHeight: '30rem',
  // textAlign: 'center',
  // background: '#364d79',
  width:"100%"
};
const HeroAds = () => (
  <Carousel autoplay={{
    dotDuration: true,
  }}
  autoplaySpeed={5000}>
    <div>
      <img src={ad1} alt="" style={contentStyle} />
    </div>
    <div>
    <img src={ad2} alt="" style={contentStyle} />
    </div>
    <div>
    <img src={ad3} alt="" style={contentStyle} />
    </div>
    <div>
    <img src={ad1} alt="" style={contentStyle} />
    </div>
  </Carousel>
);
export default HeroAds;