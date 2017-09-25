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
            initialSlide: 0,
            arrows: false,
            responsive: [
                {
                    breakpoint: 2000,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    }
                },
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
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
                    {data.reverse().map((val, id) =>
                        val.data && val.data.userInfo && <div className="item" key={id}>
                            <img
                                src={require(`../../assets/images/user/user-${val.data && val.data.userInfo ? val.data.userInfo.avatarIdx : 0}.png`)}/>
                            {val.data && <div>{val.data.userInfo && val.data.userInfo.name}</div>}
                        </div>
                    )}
                </Slider>
            </div>
        )
    }

}
