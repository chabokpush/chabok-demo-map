import React, {Component} from 'react';
import * as animationData from '../../assets/animation/muzli.json'
import Lottie from 'react-lottie';
const NumberEasing = require('react-number-easing');

const Item = ({firstName, lastName, avatar}) => {
    return (
        <li><img src={avatar} alt={lastName}/> {firstName} {lastName}</li>
    )
};

export default class Header extends Component {
    render() {
        const {data} = this.props;
        return (
            <div style={STYLE.board}>
                <div style={{
                    position: 'absolute',
                    left: 10,
                    top:5
                }}>
                    <Lottie
                        options={{
                            autoplay: true,
                            animationData: animationData
                        }}
                        height={90}
                        width={90}
                    />
                </div>
                <ul className="inline-list">
                    <li>
                        <NumberEasing
                            value={data.seeking}
                            speed={1000}
                            useLocaleString={true}
                            ease='quintInOut'/>
                        <h3>تعداد کاپیتان ها</h3>
                    </li>
                    <li>
                        <NumberEasing
                            value={data.idle}
                            speed={1000}
                            useLocaleString={true}
                            ease='quintInOut'/>
                        <h3>تعداد کاپیتان های بیکار</h3>
                    </li>
                    <li>
                        <NumberEasing
                            value={data.digging}
                            speed={1000}
                            useLocaleString={true}
                            ease='quintInOut'/>
                        <h3>تعداد حفاری ها</h3>
                    </li>
                    <li>
                        <NumberEasing
                            value={data.winner}
                            speed={1000}
                            useLocaleString={true}
                            ease='quintInOut'/>
                        <h3>گنچ های پیدا شده</h3>
                    </li>

                </ul>
            </div>
        )
    }

}


const STYLE = {
    board: {
        position: 'absolute',
        zIndex: 100,
        background: '#fff',
        width: '100%',
        height: 100,
        top: 0,
        left: 0,
        borderRadius: 5,
        opacity: 0.9
    }
};