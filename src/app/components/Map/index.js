import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Transition from 'react-motion-ui-pack';
import chabokpush from 'chabokpush';

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
            lat: 35.759172,
            lng: 51.400824
        },
        zoom: 17
    };

    constructor() {
        super();
        this.chabok();
    }


    chabok() {
        // const options = {
        //     appId: 'chabok-demo',
        //     apiKey: '779e1bf80d61d8750ca2ee8fb05dfd43daa5b092',
        //     username: 'chabokdemo',
        //     password: 'chabokdemo',
        //     devMode: false
        // };
        const options = {
            appId: 'adp-nms-push',
            apiKey: 'c89cd1703981e6efe5afb8d28a5f4ac418f29e2b',
            username: 'adp',
            password: 'test',
            devMode: true
        };
        const push = new chabokpush.Chabok(options)

        push.on('registered', deviceId => console.log('DeviceId ', deviceId))
        push.on('connected', _ => {
            console.log('Connected')
            push.enableDeliveryForEvent('geo')
            push.on('geo', geoEvent => console.log('Geo Event ', geoEvent))
        });
        push.on('message', msg => console.log('Message ', msg))

        push.register('989120032217')


    }

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
                        lat={35.759172}
                        lng={51.400824}
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