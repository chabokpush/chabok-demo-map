import React, {Component} from 'react';
import Slider from 'react-slick';
import TimeAgo from 'timeago-react';

export default class Footer extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.data !== nextProps.data) {
            return true;
        }
        if (this.props.selectedUser !== nextProps.selectedUser) {
            return true;
        }

        return false;
    }

    render() {
        const {data, selectedUser} = this.props;
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
        const user = data && data.sort((a, b) => b.createdAt - a.createdAt);
        return (
            <div className="footer">
                <Slider {...settings} className="slider">
                    {user && user.map((val, id) =>
                        val.data && val.data.lat && val.data.lng && val.data.userInfo &&
                        <div className={`${val.data.status === 'newDevice' && "scaleIn"}  item`}
                             key={id}
                             onClick={() => selectedUser(val.deviceId)}>
                            <img
                                alt={val.data.userInfo.name}
                                src={require(`../../assets/images/user/user-${val.data.userInfo.avatarIdx || 0}.png`)}/>
                            <h3 style={{margin: 0}}>{val.data.userInfo.name}</h3>
                            <TimeAgo
                                style={{direction: 'rtl', display: 'inline-block'}}
                                datetime={val.createdAt}
                                locale='fa'/>
                        </div>
                    )}
                </Slider>
            </div>
        )
    }

}
