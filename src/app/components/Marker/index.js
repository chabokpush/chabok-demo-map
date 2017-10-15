import React, {Component} from 'react';
import * as animationData from '../../assets/animation/treasure.json'
import Lottie from 'react-lottie';
const _ = require('string-to-color');

const Typing = ({receivedAt}) => (
    <div className="modal">
        <div className="typing-indicator">
            <span/>
            <span/>
            <span/>
        </div>
    </div>
);

const Sent = ({receivedAt}) => (
    <div className="modal">
        <div className="sent-indicator">
            <img
                alt="sent"
                src={require('../../assets/images/double-check.svg')}
                width={15}
            />
        </div>
    </div>
);

const Digging = ({receivedAt}) => (
    <div className="modal">
        <div className="dig-indicator">
            <img
                alt="digging"
                src={require('../../assets/images/dig.svg')}
                width={15}
            />
        </div>
    </div>
);

const Winner = ({receivedAt,name}) => (
    <div className="treasure-modal">
        <div className="win-indicator">
            <Lottie
                options={{
                    autoplay: true,
                    animationData: animationData,
                }}
                height={70}
                width={70}
            />
            <h1>{`${name} گنج رو پیدا کرد!`}</h1>
        </div>
    </div>
);

const Losser = ({receivedAt}) => (
    <div className="treasure-modal">
        <div className="lose-indicator">
            ️☹️ ☹️
        </div>
    </div>
);


export default class Marker extends Component {

    userStatus() {
        const {status, receivedAt, eventName, isFound,userInfo} = this.props;
        if (eventName === "treasure") {
            if (isFound) return <Winner key={receivedAt} name={userInfo.name} createdAt={receivedAt}/>;
            return <Losser key={receivedAt} createdAt={receivedAt}/>
        } else {
            switch (status) {
                case 'typing':
                    return <Typing key={receivedAt} createdAt={receivedAt}/>;
                    break;
                case 'sent':
                    return <Sent key={receivedAt} createdAt={receivedAt}/>;
                    break;
                case 'digging':
                    return <Digging key={receivedAt} createdAt={receivedAt}/>;
                    break;
                case null:
                    return null;
                default:
                    return null;
            }
        }
    }

    render() {
        const {deviceId, showModal, receivedAt, createdAt, status, selectedUser} = this.props;
        const statusMotion = this.userStatus();
        return (
            <div
                onClick={() => showModal()}
                key={deviceId}
                className={`${status === 'newDevice' && "scaleIn"} ${(selectedUser && selectedUser === deviceId) && "scaleOut"}`}
                style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    background: `#${_.generate(deviceId)}`,
                    padding: 4,
                    position: 'relative',
                    zIndex: receivedAt,
                    boxShadow: '0 0 4px rgba(0,0,0,0.2)'
                }}>
                {statusMotion}
                <img
                    alt={deviceId}
                    src={require('../../assets/images/logo.svg')}/>
            </div>
        )
    }
}