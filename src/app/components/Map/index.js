import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Transition from 'react-motion-ui-pack';
import * as trophy from '../../assets/animation/trophy.json'
import * as typing from '../../assets/animation/data.json'
import * as animationData from '../../assets/animation/location.json'
import Lottie from 'react-lottie';
import {geolocated} from 'react-geolocated';
const Modal = require('boron/OutlineModal');

const _ = require('string-to-color');
const API_KEY = 'AIzaSyCzNiw-oILSDrSZK8-O3tyya9mMqeDH0AE';


const Typing = () => (
    <div className="typing">
        <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

const Sent = () => (
    <div className="typing">
        <div className="typing-indicator">
            ارسال شد
        </div>
    </div>
);


class MarkerComponent extends Component {
    constructor() {
        super();
        this.state = {hidden: true}
    }

    setTimer() {
        this.timer && clearTimeout(this.timer);
        this.show();
        this.timer = setTimeout(() => {
            this.hide();
        }, 2500)
    }

    componentDidMount() {
        this.setTimer();
    }

    componentWillReceiveProps() {
        this.setTimer();
    }

    show() {
        this.setState({hidden: false});
    }

    hide() {
        this.setState({hidden: true});
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const {status, key, deviceId, showModal} = this.props;
        const {hidden} = this.state;
        return ( <div>
            <div
                key={key}
                style={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    background: `#${_.generate(deviceId)}`,
                    padding: 4
                }}>
                <div title={deviceId} onClick={() => showModal()}>
                    {(status === 'typing' && !hidden) && <Typing/>}
                    {(status === 'sent' && !hidden) && <Sent/>}
                    <img
                        alt={deviceId}
                        src={require('../../assets/images/logo.svg')}/>
                </div>
            </div>
        </div>)
    }
}

const CompanyLocation = () => (
    <div style={{
        position: 'absolute',
        top: -35,
        left: -35
    }}>
        <Lottie
            options={{
                autoplay: true,
                animationData: animationData,
            }}
            height={70}
            width={70}
        />
    </div>
);

export default class Map extends Component {
    static defaultProps = {
        center: {
            lat: 35.759172,
            lng: 51.400824
        },
        zoom: 17
    };

    constructor() {
        super();
        this.state = {
            modalState: {}
        }
    }


    showModal(val) {
        this.refs.modal.show();
        this.setState({
            modalState: val
        })
    }

    hideModal() {
        this.refs.modal.hide();
    }

    render() {
        const {markers, zoom, center} = this.props;
        const {modalState} = this.state;
        console.log(modalState);
        return (
            <div className="map">
                <Modal ref="modal"
                       contentStyle={{padding: 30, textAlign: 'center'}}>
                    <img
                        src={require(`../../assets/images/user/user-${modalState.data && modalState.data.userInfo ? modalState.data.userInfo.avatarIdx : 0}.png`)}/>
                    <h2>{modalState.data && modalState.data.userInfo && modalState.data.userInfo.name}</h2>
                    <h2>{modalState.data && modalState.data.userInfo && modalState.data.userInfo.userId}</h2>
                    <h2>{modalState.deviceId}</h2>
                    <button onClick={this.hideModal.bind(this)}>بستن</button>
                </Modal>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: API_KEY,
                        language: 'fa',
                    }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <CompanyLocation
                        key={'company'}
                        lat={center.lat}
                        lng={center.lng}
                    />

                    {markers.map((val, id) => <MarkerComponent
                        key={id}
                        lat={val.data.lat}
                        lng={val.data.lng}
                        status={val.data.status}
                        deviceId={val.deviceId}
                        showModal={this.showModal.bind(this, val)}
                    />)}
                </GoogleMapReact>
            </div>
        );
    }
}
