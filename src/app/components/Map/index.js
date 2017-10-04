import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import * as animationData from '../../assets/animation/location.json'
import Marker from '../../components/Marker'
import Lottie from 'react-lottie';
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
                <SkyLight ref="modal"
                          hideOnOverlayClicked
                          className={"modal"}>
                    <div style={{padding: 30, textAlign: 'center'}}>
                        <img
                            alt="user"
                            src={require(`../../assets/images/user/user-${modalState.data && modalState.data.userInfo ? modalState.data.userInfo.avatarIdx : 0}.png`)}/>
                        <h2>{modalState.data && modalState.data.userInfo && modalState.data.userInfo.name}</h2>
                        <h2>{modalState.data && modalState.data.userId}</h2>
                        <h2>{modalState.data && modalState.data.deviceModel}</h2>
                        <button onClick={this.hideModal.bind(this)}>بستن</button>
                    </div>
                </SkyLight>
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

                    {markers && markers.map((val, id) => (val.data.lat && val.data.lng && val.data.userInfo) && <Marker
                        selectedUser={selectedUser}
                        key={val.deviceId}
                        lat={val.data.lat}
                        lng={val.data.lng}
                        receivedAt={val.data.receivedAt}
                        createdAt={val.t}
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
