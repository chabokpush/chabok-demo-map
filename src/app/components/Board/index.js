import React, {Component} from 'react';
import * as animationData from '../../assets/animation/muzli.json'
import Lottie from 'react-lottie';


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
                        height={50}
                        width={50}
                    />
                </div>
                <ul className="inline-list">
                    <li>{data.captain}
                        <span> تعداد کاپیتان ها</span>
                    </li>
                    <li>
                        {data.digging}
                        <span> تعداد حفاری ها</span>
                    </li>
                    <li>
                        {data.winner}
                        <span> گنچ های پیدا شده</span>
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
        height: 60,
        top: 0,
        left: 0,
        borderRadius: 5,
        opacity: 0.9
    }
};