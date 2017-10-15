import React, {PureComponent} from 'react';
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

export default class Map extends PureComponent {
    constructor() {
        super();
        this.state = {
            modalState: {}
        }
    }

    static defaultProps = {
        defaultCenter: {
            lat: 35.759172,
            lng: 51.400824
        },
        defaultZoom:17
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
        const {markers, zoom, center, selectedUser,defaultCenter,defaultZoom} = this.props;
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
                        mapType: "roadmap"
                    }}
                    defaultCenter={defaultCenter}
                    center={center || defaultCenter}
                    defaultZoom={defaultZoom}
                    zoom={zoom || defaultZoom}
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
                        userInfo={val.data.userInfo}
                        isFound={val.data.found || false}
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
