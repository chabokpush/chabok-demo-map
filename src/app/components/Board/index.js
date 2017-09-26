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
                    top: 5
                }}>
                    <img src={require('../../assets/images/adp.png')} alt="" style={{height: 40}}/>


                </div>

                <ul className="inline-list stats">
                    <li>
                        <img src={require('../../../logo.svg')} alt=""/> چابک
                    </li>
                    <li>
                        <img src={require('../../assets/images/captain.svg')} alt=""/>
                        {data.captain}
                        <span>کاپیتان</span>
                    </li>
                    <li>
                        <img src={require('../../assets/images/kolang.svg')} alt=""/>
                        {data.digging}
                        <span>حفاری</span>
                    </li>
                    <li>
                        <img src={require('../../assets/images/treasure.svg')} alt=""/>
                        {data.winner}
                        <span>گنچ پیدا شده</span>
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
        opacity: 1
    }
};