import React from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider-banner-1.png';
import slider2 from '../../assets/images/slider-banner-1.png';
import slider3 from '../../assets/images/slider-banner-1.png';


const HomePage = () => {
   return (
      <div id="container" style={{ padding: '0px 70px', height: '1500px' }}>
         <SliderComponent arrImages={[slider1, slider2, slider3]} />
         <div style={{ marginTop: '40px' }}>
            <CardComponent />
         </div>
      </div>
   )
};

export default HomePage
