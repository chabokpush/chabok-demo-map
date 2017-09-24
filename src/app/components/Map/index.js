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


const MarkerComponent = ({status, key, channel, showModal}) => (
    <div>
        <div
            key={key}
            style={{
                width: 15,
                height: 15,
                borderRadius: 15,
                background: `#${_.generate(channel)}`,
                padding: 4
            }}>
            <div title={channel} onClick={() => showModal()}>
                <img
                    alt={channel}
                    src={require('../../assets/images/logo.svg')}/>
            </div>
        </div>
    </div>
);

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

class Map extends Component {
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
        return (
            <div className="map">
                <Modal ref="modal"
                       contentStyle={{padding: 30}}>
                    <h2>{modalState && modalState.data && modalState.data.name}</h2>
                    <h2>{modalState && modalState.channel}</h2>
                    <h3>{modalState && modalState.status}</h3>
                    <button onClick={this.hideModal.bind(this)}>بستن</button>
                </Modal>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: API_KEY,
                        language: 'fa',
                        option: {
                            styles: [{stylers: [{'saturation': -100}, {'gamma': 0.8}, {'lightness': 4}, {'visibility': 'on'}]}]
                        }
                    }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <CompanyLocation
                        key={'company'}
                        lat={this.props.coords ? this.props.coords.latitude : center.lat}
                        lng={this.props.coords ? this.props.coords.longitude : center.lng}
                    />

                    {markers.map((val, id) => <MarkerComponent
                        key={id}
                        lat={val.lat}
                        lng={val.lng}
                        status={val.status}
                        channel={val.channel}
                        showModal={this.showModal.bind(this, val)}
                    />)}
                </GoogleMapReact>
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000
})(Map);