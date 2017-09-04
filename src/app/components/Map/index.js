import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Transition from 'react-motion-ui-pack'
import {spring} from 'react-motion'
import * as animationData from '../../assets/animation/location.json'
import Lottie from 'react-lottie';
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
                background: status === 'winner' ? 'red' : status === 'digging' ? '#efb429' : '#007AFF',
                padding: 4
            }}>
            <a title={status} href="#">
                <img
                    src={status === 'digging' ? require('../../assets/images/dig.svg') : require('../../assets/images/logo.svg')}/>
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


export default class Map extends Component {
    static defaultProps = {
        center: {
            lat: 35.789743,
            lng: 51.399842
        },
        zoom: 17
    };

    render() {
        const {markers, zoom} = this.props;
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
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <CompanyLocation
                        key={'company'}
                        lat={35.789699}
                        lng={51.401578}
                    />

                    {markers.map((val, id) => <AnyReactComponent
                        key={id}
                        lat={val.lat}
                        lng={val.lng}
                        status={val.status}
                    />)}
                </GoogleMapReact>
            </div>
        );
    }
}