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
            chabok: 'offline',
            stats: {
                digging: 0,
                winner: 0,
                captain: 0
            }
        };

        this.options = 'dev' in this.getQueryStringObject() ? config.DEVELOPMENT : config.PRODUCTION;
        this.push = new chabokpush.Chabok(this.options);
        this.chabok();
    }

    cloneDeep(val) {
        return val ? JSON.parse(JSON.stringify(val)) : {}
    }

    componentDidUpdate() {
        this.state.markers && this.state.markers.length ? Storage.set(this.options.appId, this.cloneDeep(this.state.markers)) : null;
        this.state.stats && Object.keys(this.state.stats).length ? Storage.set('stats', this.cloneDeep(this.state.stats)) : null;
    }

    getUnregisteredUser() {
        const users = Storage.get(this.options.appId) || [];
        return users.map(user => user.data && !user.data.userInfo ? user : null);
    }

    getValidUserCount() {
        return this.state.markers.filter(user => user.data && user.data.userInfo).length;

    }

    fixUserBrokenData() {
        const getUnregisteredUser = this.getUnregisteredUser();
        const unregisteredUser = getUnregisteredUser
            .map(user => user && user.deviceId)
            .filter(user => !!user);

        unregisteredUser.length && this.push.getInstallations(unregisteredUser)
            .then(items => {
                getUnregisteredUser && getUnregisteredUser.map(user => {
                    items &&
                    items
                        .map(item => {
                            (user && user.deviceId === item.id) && this.setMarkerState(objectAssignDeep(user, {data: item}))
                        })
                });
            });
    }

    chabok() {
        const push = this.push;
        push.on('registered', deviceId => console.log('DeviceId ', deviceId));
        push.on('connecting', _ => console.log('Reconnecting'));
        push.on('disconnected', _ => console.log('offline'));
        push.on('closed', _ => console.log('disconnected'));

        push.on('connected', _ => {
            console.log('Connected');
            this.setState({
                chabok: 'Connected'
            });
            push.enableEventDelivery([
                {
                    name: 'treasure',
                    live: false
                },
                {
                    name: 'captainStatus',
                    live: false
                },
                {
                    name: 'geo',
                    live: false
                },
                {
                    name: 'newDevice',
                    live: false
                }]);
            push.on('geo', geoEvent => {
                console.log('Geo Event ', geoEvent);
                this.setMarkerState(geoEvent);
            });
            push.on('treasure', treasureEvent => {
                console.log('treasure ', treasureEvent);
                this.setMarkerState(treasureEvent);
            });
            push.on('captainStatus', status => {
                console.log('captainStatus ', status);
                this.setMarkerState(status);
            });
            push.on('newDevice', devices => {
                console.log('newDevice ', devices);
                this.setMarkerState(devices);
            });
        });
        push.on('message', msg => console.log('Message ', msg))
        push.register('chabok-demo-map')
    }

    setMarkerState(obj) {
        console.log(obj);
        this.setState({
            markers: this.upsetArray(this.cloneDeep(this.state.markers), obj)
        });
    }

    upsetArray(array, obj) {
        const arr = [].concat(array);
        if (!obj.deviceId) return;
        const filterResult = arr.filter(val => obj.deviceId && val.deviceId === obj.deviceId);
        if (filterResult.length) {
            arr.map((val, index) => val.deviceId === obj.deviceId ? arr[index] = objectAssignDeep({}, val, obj, {t: Date.now()}) : '');
        } else {
            arr.push(objectAssignDeep(obj, {t: Date.now(), data: {status: 'newDevice'}}));
        }
        this.setState({
            stats: objectAssignDeep({}, this.state.stats, {
                digging: obj && obj.data.status === 'digging' ? this.state.stats.digging + 1 : this.state.stats.digging,
                winner: obj && obj.data.found === true && obj.eventName === "treasure" ? this.state.stats.winner + 1 : this.state.stats.winner,
                captain: this.getValidUserCount()
            })
        });
        return arr;
    }

    getQueryStringObject() {
        return queryString.parse(window.location.search)
    }

    componentDidMount() {
        const queryStringObject = this.getQueryStringObject();
        this.options = 'dev' in queryStringObject ? config.DEVELOPMENT : config.PRODUCTION;
        if ('location' in queryStringObject) {
            const centerLocationObject = queryStringObject.location.split(',');
            this.setState({center: {lat: +centerLocationObject[0], lng: +centerLocationObject[1]}});
        }
        this.getStoreData();
        this.fixUserBrokenData();
    }

    getStoreData() {
        this.setState({
            markers: Storage.get(this.options.appId) || [],
            stats: Storage.get('stats') || this.state.stats
        })
    }

    selectedUser(deviceId) {
        this.userMotionTimer && clearTimeout(this.userMotionTimer);
        this.setState({
            selectedUser: deviceId
        });
        this.userMotionTimer = setTimeout(() => {
            this.setState({
                selectedUser: ''
            })
        }, 2000)
    }

    render() {
        const props = Object.assign(Object.keys(this.state.center).length && {
                center: this.state.center,
            });
        return (
            <div className="App">
                <Board data={this.state.stats} chabok={this.state.chabok}/>
                <Map markers={this.state.markers}
                     {...props}
                     selectedUser={this.state.selectedUser}/>
                <Footer data={this.state.markers} selectedUser={this.selectedUser.bind(this)}/>
            </div>
        );
    }
}
