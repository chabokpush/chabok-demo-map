import React, {Component} from 'react';
import '../assets/css/App.css';
import Map from '../components/Map'
import Board from '../components/Board'
import Footer from '../components/Footer'
import chabokpush from 'chabokpush';
import Storage from '../helper/Storage';
import config from '../config/chabok.json';
import queryString from 'query-string';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            markers: [],
            center: {
                lat: 35.759172,
                lng: 51.400824
            },
            stats: {
                captain: 0,
                idle: 0,
                digging: 0,
                winner: 0,
            }
        };
        this.chabok();
    }

    cloneDeep(val) {
        return JSON.parse(JSON.stringify(val))
    }

    componentWillUpdate(nestProps, nextState) {
        nextState.markers.length ? Storage.set(this.options.appId, this.cloneDeep(nextState.markers)) : null;
    }

    chabok() {
        const queryStringObject = queryString.parse(window.location.search);
        this.options = 'dev' in queryStringObject ? config.DEVELOPMENT : config.PRODUCTION;
        const push = new chabokpush.Chabok(this.options);
        push.on('registered', deviceId => console.log('DeviceId ', deviceId))
        push.on('connected', _ => {
            console.log('Connected');
            push.enableEventDelivery([
                {
                    name: 'treasure',
                    live: false
                },
                {
                    name: 'captainStatus',
                    live: true
                },
                {
                    name: 'geo',
                    live: false
                }]);
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

        });
        push.on('message', msg => console.log('Message ', msg))
        push.register('chabok-demo-map')
    }

    upsetArray(array, obj) {
        const arr = [].concat(array);
        const filterResult = arr.filter(val => obj.deviceId && val.deviceId === obj.deviceId);
        if (filterResult.length) {
            arr.map((val, index) => val.deviceId === obj.deviceId ? arr[index] = Object.assign(val, obj) : '');
        } else {
            arr.push(obj);
        }
        // console.table(arr);
        this.setState({
            stats: Object.assign(this.state.stats, {
                captain: arr.length
            })
        });
        return arr;
    }


    componentDidMount() {
        const queryStringObject = queryString.parse(window.location.search);
        this.options = 'dev' in queryStringObject ? config.DEVELOPMENT : config.PRODUCTION;
        if ('location' in queryStringObject) {
            const centerLocationObject = queryStringObject.location.split(',');
            this.setState({center: {lat: +centerLocationObject[0], lng: +centerLocationObject[1]}});
        }
        const markers = Storage.get(this.options.appId);
        markers ? this.setState({markers: markers}) : null;
    }

    render() {
        return (
            <div className="App">
                <Board data={this.state.stats}/>
                <Map markers={this.state.markers} center={this.state.center}/>
                <Footer data={this.state.markers}/>
            </div>
        );
    }
}
