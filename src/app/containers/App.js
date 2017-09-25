import React, {Component} from 'react';
import '../assets/css/App.css';
import Map from '../components/Map'
import Board from '../components/Board'
import Footer from '../components/Footer'
import chabokpush from 'chabokpush';
import Storage from '../helper/Storage';
import config from '../config/chabok.json';
import queryString from 'query-string';
const objectAssignDeep = require(`../helper/objectAssignDeep`);

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            markers: [],
            center: {},
            stats: {
                captain: 0,
                idle: 0,
                digging: 0,
                winner: 0,
            }
        };
    }

    cloneDeep(val) {
        return JSON.parse(JSON.stringify(val))
    }

    componentWillUpdate(nestProps, nextState) {
        nextState.markers.length ? Storage.set(this.options.appId, this.cloneDeep(nextState.markers)) : null;
    }

    chabok() {
        this.options = 'dev' in this.getQueryStringObject() ? config.DEVELOPMENT : config.PRODUCTION;
        const push = new chabokpush.Chabok(this.options);
        push.on('registered', deviceId => console.log('DeviceId ', deviceId))
        push.on('connected', _ => {
            console.log('Connected');
            // push.enableEventDelivery([
            //     {
            //         name: 'treasure',
            //         live: false
            //     },
            //     {
            //         name: 'captainStatus',
            //         live: true
            //     },
            //     {
            //         name: 'geo',
            //         live: false
            //     },
            //     {
            //         name: 'newDevice',
            //         live: false
            //     }]);
            push.enableEventDelivery('treasure');
            push.enableEventDelivery('captainStatus');
            push.enableEventDelivery('geo');
            push.enableEventDelivery('newDevice');
            push.on('geo', geoEvent => {
                console.log('Geo Event ', geoEvent);
                this.setState({
                    markers: this.upsetArray(this.state.markers, geoEvent)
                })
            });
            push.on('treasure', treasureEvent => {
                console.log('treasure ', treasureEvent);
                this.setState({
                    markers: this.upsetArray(this.state.markers, treasureEvent)
                })
            });
            push.on('captainStatus', status => {
                console.log('captainStatus ', status);
                this.setState({
                    markers: this.upsetArray(this.state.markers, status)
                })
            });
            push.on('newDevice', devices => {
                console.log('newDevice ', devices);
                this.setState({
                    markers: this.upsetArray(this.state.markers, devices)
                })
            });
        });
        push.on('message', msg => console.log('Message ', msg))
        push.register('chabok-demo-map')
    }

    upsetArray(array, obj) {
        const arr = [].concat(array);
        const filterResult = arr.filter(val => obj.deviceId && val.deviceId === obj.deviceId);
        if (filterResult.length) {
            arr.map((val, index) => val.deviceId === obj.deviceId ? arr[index] = objectAssignDeep(val, obj) : '');
        } else {
            arr.push(obj);
        }
        this.setState({
            stats: objectAssignDeep(this.state.stats, {
                captain: arr.length
            })
        });
        return arr;
    }

    getQueryStringObject() {
        return queryString.parse(window.location.search)
    }

    componentDidMount() {
        this.chabok();
        const queryStringObject = this.getQueryStringObject();
        this.options = 'dev' in queryStringObject ? config.DEVELOPMENT : config.PRODUCTION;
        if ('location' in queryStringObject) {
            const centerLocationObject = queryStringObject.location.split(',');
            this.setState({center: {lat: +centerLocationObject[0], lng: +centerLocationObject[1]}});
        }
        const markers = Storage.get(this.options.appId);
        markers ? this.setState({markers: markers}) : null;
    }

    render() {
        const props = Object.assign(Object.keys(this.state.center).length && {
                center: this.state.center
            });
        return (
            <div className="App">
                <Board data={this.state.stats}/>
                <Map markers={this.state.markers} {...props}/>
                <Footer data={this.state.markers}/>
            </div>
        );
    }
}
