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
                        height={90}
                        width={90}
                    />
                </div>
                <ul className="inline-list">
                    <li>{data.seeking}
                        <h3>تعداد کاپیتان ها</h3>
                    </li>
                    <li>
                        {data.idle}
                        <h3>تعداد کاپیتان های بیکار</h3>
                    </li>
                    <li>
                        {data.digging}
                        <h3>تعداد حفاری ها</h3>
                    </li>
                    <li>
                        {data.winner}
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