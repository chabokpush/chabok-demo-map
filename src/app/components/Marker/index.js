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
        <div className={createdAt ? 'idle-indicator' : ''}>
            <span>z</span>
            <span>z</span>
            <span>Z</span>
        </div>
    </div>
);

export default class Marker extends Component {
    constructor() {
        super();
        this.q = new Qeue();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const delay = nextProps.status === this.props.status ? 2500 : 500;
    //     return !(nextProps.eventName === "captainStatus" && nextProps.createdAt < this.props.createdAt + delay);
    // }

    userStatus() {
        const q = this.q.get() || {};
        const state = Object.keys(q).length ? q.val : null;
        switch (state) {
            case 'typing':
                return <Typing key={q.createAt} createdAt={q.createAt}/>;
                break;
            case 'sent':
                return <Sent key={q.createAt} createdAt={q.createAt}/>;
                break;
            case 'digging':
                return <Digging key={q.createAt} createdAt={q.createAt}/>;
                break;
            // case 'idle':
            //     return <Idle createdAt={createdAt}/>;
            //     break;
            default:
                return null;
        }
    }

    setMarkerStatusOnQeue() {
        const {status} = this.props;
        this.q.set(status);
    }

    componentDidUpdate() {
        this.setMarkerStatusOnQeue();
    }

    componentDidMount() {
        this.setMarkerStatusOnQeue();
    }

    render() {
        const {status, key, deviceId, showModal, createdAt, receivedAt} = this.props;
        const statusMotion = this.userStatus();
        const now = Date.now();

        return ( <div>
            <div
                key={key}
                style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    background: `#${_.generate(deviceId)}`,
                    padding: 4,
                    position: 'relative',
                    zIndex: receivedAt
                }}>
                <div onClick={() => showModal()}>

                    {createdAt + 2000 > now && statusMotion}
                    <img
                        alt={deviceId}
                        src={require('../../assets/images/logo.svg')}/>
                </div>
            </div>
        </div>)
    }
}