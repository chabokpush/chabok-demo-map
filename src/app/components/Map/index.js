import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import * as animationData from '../../assets/animation/location.json'
import Marker from '../../components/Marker'
import Lottie from 'react-lottie';
import _ from "lodash/collection";
import SkyLight from 'react-skylight';
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


const dialogStyle = {
    width: '300px',
    height: '400px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-200px',
    marginLeft: '-150px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    zIndex: 100,
    padding: '15px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)'
};

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
        const {markers, zoom, center, selectedUser} = this.props;
        const {modalState} = this.state;
        return (
            <div className="map">
                <SkyLight
                    dialogStyles={dialogStyle}
                    closeButtonStyle={{
                        display: 'none'
                    }}
                    ref="modal"
                    hideOnOverlayClicked>
                    <div style={{padding: 30, textAlign: 'center'}}>
                        <img
                            alt="user"
                            src={require(`../../assets/images/user/user-${modalState.data && modalState.data.userInfo ? modalState.data.userInfo.avatarIdx : 0}.png`)}/>
                        <h1>{modalState.data && modalState.data.userInfo && modalState.data.userInfo.name}</h1>
                        <h2>{modalState.data && modalState.data.userId}</h2>
                        <h3>{modalState.data && modalState.data.deviceModel}</h3>
                        <button style={{
                            padding: '5px 10px',
                            border: 'none',
                            background: '#fff',
                            fontSize: '12px'
                        }} onClick={this.hideModal.bind(this)}>بستن
                        </button>
                    </div>
                </SkyLight>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: API_KEY,
                        language: 'fa',
                    }}
                    yesIWantToUseGoogleMapApiInternals={true}
                    options={{
                        mapType: "roadmap",
                        styles: [
                            {
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#ebe3cd"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#523735"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#f5f1e6"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#c9b2a6"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#dcd2be"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#ae9e90"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape.natural",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#dfd2ae"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#dfd2ae"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#93817c"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#a5b076"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#447530"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#f5f1e6"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#fdfcf8"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#f8c967"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#e9bc62"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway.controlled_access",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#e98d58"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway.controlled_access",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#db8555"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#806b63"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#dfd2ae"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#8f7d77"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#ebe3cd"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#dfd2ae"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#b9d3c2"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#92998d"
                                    }
                                ]
                            }
                        ]
                    }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <CompanyLocation
                        key={'company'}
                        lat={center.lat}
                        lng={center.lng}
                    />

                    {markers && _.map(markers, (val, id) => (val.data.lat && val.data.lng && val.data.userInfo) &&
                    <Marker
                        selectedUser={selectedUser}
                        key={val.deviceId}
                        lat={val.data.lat}
                        lng={val.data.lng}
                        receivedAt={val.data.receivedAt}
                        createdAt={val.createdAt}
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
