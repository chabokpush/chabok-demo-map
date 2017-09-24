import React, {Component} from 'react';
import * as animationData from '../../assets/animation/muzli.json'
import Lottie from 'react-lottie';
import Slider from 'react-slick';

export default class Footer extends Component {
    render() {
        const {data} = this.props;
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }],
            swipe: true,
        };
        return (
            <div className="footer">
                <Slider {...settings} className="slider">
                    {data.map((val, id) =>
                        <div className="item" key={id}>
                            <img src={require('../../assets/images/captain.svg')} alt=""/>
                            {val.data && <div>{val.data.name}</div>}
                        </div>
                    )}
                </Slider>
            </div>
        )
    }

}
