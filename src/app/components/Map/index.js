import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Transition from 'react-motion-ui-pack';
import * as animationData from '../../assets/animation/location.json'
import Lottie from 'react-lottie';
import {geolocated} from 'react-geolocated';

const _ = require('string-to-color');
const API_KEY = 'AIzaSyCzNiw-oILSDrSZK8-O3tyya9mMqeDH0AE';


const AnyReactComponent = ({status, key}) => (
    <Transition
        component={false}
        enter={{
            opacity: 1,
        }}
        leave={{
            opacity: 0,
        }}
    >
        <div
            key={"status"}
            style={{
                width: 15,
                height: 15,
                borderRadius: 15,
                background: `#${_.generate(status)}`,
                padding: 4
            }}>
            <a title={status} href="!#">
                <img
                    alt={status}
                    src={require('../../assets/images/logo.svg')}/>
            </a>
        </div>
    </Transition>
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

    render() {
        const {markers, zoom, center} = this.props;
        return (
            <div className="map">
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

                    {markers.map((val, id) => <AnyReactComponent
                        key={id}
                        lat={val.lat}
                        lng={val.lng}
                        status={val.channel}
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