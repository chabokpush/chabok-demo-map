import React, {Component} from 'react';
import Qeue from '../../helper/qeue';

const _ = require('string-to-color');

const Typing = ({createdAt}) => (
    <div className="modal" style={{zIndex: createdAt}}>
        <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

const Sent = ({createdAt}) => (
    <div className="modal">
        <div className="sent-indicator" style={{zIndex: createdAt}}>
            <img
                src={require('../../assets/images/double-check.svg')}
                width={15}
            />
        </div>
    </div>
);

const Digging = ({createdAt}) => (
    <div className="modal">

        <div className="dig-indicator" style={{zIndex: createdAt}}>
            <img
                src={require('../../assets/images/dig.svg')}
                width={15}
            />
        </div>
    </div>
);

const Idle = ({createdAt}) => (
    <div className="modal">
        <div className='idle-indicator'>
            <span>z</span>
            <span>z</span>
            <span>Z</span>
        </div>
    </div>
);


export default class Marker extends Component {

    userStatus() {
        const {status, createdAt} = this.props;
        switch (status) {
            case 'typing':
                return <Typing key={createdAt} createdAt={createdAt}/>;
                break;
            case 'sent':
                return <Sent key={createdAt} createdAt={createdAt}/>;
                break;
            case 'digging':
                return <Digging key={createdAt} createdAt={createdAt}/>;
                break;
            default:
                return null;
        }
    }


    render() {
        const {deviceId, createdAt, showModal, receivedAt, status, selectedUser} = this.props;
        const statusMotion = this.userStatus();
        const now = Date.now();
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
                    zIndex: receivedAt
                }}>
                {createdAt + 120000 > now && statusMotion}
                <img
                    alt={deviceId}
                    src={require('../../assets/images/logo.svg')}/>
            </div>
        )
    }
}