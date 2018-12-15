import React, { Component } from 'react';
import Slider from 'react-slick';
 
class SimpleSlider extends Component {
  render(){
    const settings = {
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3
    };
    return (
      <Slider {...settings}>
        <div><img src="https://res.cloudinary.com/peterfuwork/image/upload/v1543973332/iqunfofzdd10r9tg04vf.jpg" /></div>
        <div><img src="https://res.cloudinary.com/peterfuwork/image/upload/v1544081936/nyja562xfnegrycdbo0s.jpg" /></div>
        <div><img src="https://res.cloudinary.com/peterfuwork/image/upload/v1543973352/pf2phyzjxvplbt26qxmj.jpg" /></div>
        <div><img src="https://res.cloudinary.com/peterfuwork/image/upload/v1543973341/fum4d2pnv221kbob3yh9.jpg" /></div>
        <div><img src="https://res.cloudinary.com/peterfuwork/image/upload/v1543973884/zceofq15w1cf20hssmpt.jpg" /></div>
        <div><img src="https://res.cloudinary.com/peterfuwork/image/upload/v1543972992/fzpnlpxhn460s103mqdw.jpg" /></div>
      </Slider>
    );
  }
}

export default SimpleSlider;