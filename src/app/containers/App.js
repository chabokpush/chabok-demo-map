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
        this.queryStringHandler();
        this.chabok();
    }

    cloneDeep(val) {
        return JSON.parse(JSON.stringify(val))
    }

    componentWillUpdate(nestProps, nextState) {
        nextState.markers.length ? Storage.set(this.options.appId, this.cloneDeep(nextState.markers)) : null;
    }

    getUrlParameter(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    generateRandomStatus() {
        const statusArr = ['walking', 'typing', 'sent', 'kolang', 'win'];
        return statusArr[Math.floor(Math.random() * statusArr.length)]
    }

    chabok() {
        const push = new chabokpush.Chabok(this.options);
        push.on('registered', deviceId => console.log('DeviceId ', deviceId))
        push.on('connected', _ => {
            console.log('Connected')
            push.enableDeliveryForEvent('geo');
            push.enableDeliveryForEvent('treasure');
            push.enableDeliveryForEvent('captainStatus');
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
        push.register('989120032217')
    }

    upsetArray(array, obj) {
        const arr = [].concat(array);
        const userId = obj.channel.split('/')[1];
        const updated_time = new Date().getTime();
        const filterResult = arr.filter(val => userId && val.userId === userId);
        if (filterResult.length) {
            arr.map((val, index) => val.userId === userId ? arr[index] = Object.assign(val, obj, {
                userId,
                updated_time
            }) : '');
        } else {
            arr.push(Object.assign(obj, {userId, updated_time}));
        }
        console.table(arr);
        this.setState({
            stats: Object.assign(this.state.stats, {
                captain: arr.length
            })
        });
        return arr;
    }

    queryStringHandler() {
        const queryStringObject = queryString.parse(window.location.search);
        this.options = 'dev' in queryStringObject ? config.DEVELOPMENT : config.PRODUCTION;
        if ('location' in queryStringObject) {
            const centerLocationObject = queryStringObject.location.split(',');
            this.setState({center: {lat: +centerLocationObject[0], lng: +centerLocationObject[1]}});
        }
    }

    componentDidMount() {

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
