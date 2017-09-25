import React, {Component} from 'react';
import Slider from 'react-slick';
import TimeAgo from 'timeago-react';

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
            easing: 'ease',
            responsive: [
                {
                    breakpoint: 2000,
                    settings: {
                        slidesToShow: 7,
                        slidesToScroll: 7,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
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
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }],
            swipe: true,
            touchMove: true
        };
        const user = data.sort((a, b) => b.receivedAt - a.receivedAt);
        return (
            <div className="footer">
                <Slider {...settings} className="slider">
                    {user.map((val, id) =>
                        val.data && val.data.userInfo && <div className="item" key={id}>
                            <img
                                src={require(`../../assets/images/user/user-${val.data && val.data.userInfo ? val.data.userInfo.avatarIdx : 0}.png`)}/>
                            {val.data && <h3 style={{margin: 0}}>{val.data.userInfo && val.data.userInfo.name}</h3>}
                            <TimeAgo
                                style={{direction: 'rtl', display: 'inline-block'}}
                                datetime={val.receivedAt}
                                locale='fa'/>
                        </div>
                    )}
                </Slider>
            </div>
        )
    }

}
