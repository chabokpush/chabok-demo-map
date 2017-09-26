import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import * as trophy from '../../assets/animation/trophy.json'
import * as typing from '../../assets/animation/data.json'
import * as animationData from '../../assets/animation/location.json'
import Marker from '../../components/Marker'
import Lottie from 'react-lottie';
const Modal = require('boron/OutlineModal');
const API_KEY = 'AIzaSyCzNiw-oILSDrSZK8-O3tyya9mMqeDH0AE';


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

                    {markers.map((val, id) => val.data.lat && val.data.lng && <Marker
                        key={id}
                        lat={val.data.lat}
                        lng={val.data.lng}
                        createdAt={val.data.createdAt}
                        receivedAt={val.data.receivedAt}
                        status={val.data.status}
                        deviceId={val.deviceId}
                        eventName={val.eventName}
                        showModal={this.showModal.bind(this, val)}
                    />)}
                </GoogleMapReact>
            </div>
        );
    }
}
