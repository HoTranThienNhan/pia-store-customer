import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider-banner-1.png';
import slider2 from '../../assets/images/slider-banner-1.png';
import slider3 from '../../assets/images/slider-banner-1.png';

const HomePage = () => {
   return (
      <div style={{ padding: '0px 70px' }}>
         <SliderComponent arrImages={[slider1, slider2, slider3]}/>
         <div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
         </div>
      </div>
   )
};

export default HomePage
