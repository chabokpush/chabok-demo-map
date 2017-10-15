import React, {PureComponent} from 'react';

export default class Header extends PureComponent {
    render() {
        const {data, chabok} = this.props;
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
                        <img src={require('../../../logo.svg')} alt="" style={{height: 40}}/> چابک
                    </li>
                    <li className="invisible-mobile">
                        <img src={require('../../assets/images/captain.svg')} alt=""/>
                        {data && data.captain}
                        <span>کاپیتان</span>
                    </li>
                    <li className="invisible-mobile">
                        <img src={require('../../assets/images/kolang.svg')} alt=""/>
                        {data && data.digging}
                        <span>حفاری</span>
                    </li>
                    <li className="invisible-mobile">
                        <img src={require('../../assets/images/treasure.svg')} alt=""/>
                        {data && data.winner}
                        <span>گنچ پیدا شده</span>
                    </li>

                </ul>
                <div style={{
                    position: 'absolute',
                    height: 2,
                    transition: 'background-color 250ms linear',
                    background: chabok === 'offline' ? '#FE2851' : chabok === 'Connected' ? '#4998FF' : '#F5A623',
                    width: '100%',
                    bottom: 0
                }}/>
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
        opacity: 1,
        overflow: 'hidden'
    }
};