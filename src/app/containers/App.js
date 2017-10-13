import React, {Component} from 'react';
import Map from '../components/Map'
import Board from '../components/Board'
import Footer from '../components/Footer'
import chabokpush from 'chabokpush';
import Storage from '../helper/Storage';
import {size} from '../helper/Size';
import config from '../config/chabok.json';
import queryString from 'query-string';
import _ from "lodash";
const objectAssignDeep = require(`../helper/objectAssignDeep`);
const asyncTimedCargo = require('async-timed-cargo');

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
        this.cargoHandler(25, 500)
    }

    componentDidUpdate() {
        this.state.markers && size(this.state.markers) && Storage.set(this.options.appId, _.cloneDeep(this.state.markers));
        this.state.stats && size(this.state.stats) && Storage.set('stats', _.cloneDeep(this.state.stats));
    }

    getUnregisteredUser() {
        const users = Storage.get(this.options.appId) || [];
        return _.map(users, user => user.data && !user.data.userInfo ? user : null);
    }

    getValidUserCount() {
        return size(_.filter(this.state.markers, user => user.data && user.data.userInfo));
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
                this.cargo.push(geoEvent);
            });
            push.on('treasure', treasureEvent => {
                console.log('treasure ', treasureEvent);
                this.cargo.push(treasureEvent);
            });
            push.on('captainStatus', status => {
                console.log('captainStatus ', status);
                this.cargo.push(status);

            });
            push.on('newDevice', devices => {
                console.log('newDevice ', devices);
                this.cargo.push(devices);
            });
        });
        push.on('message', msg => console.log('Message ', msg))
        push.register('chabok-demo-map')
    }

    setMarkerState(obj) {
        this.setState({
            markers: this.upsetArray(_.cloneDeep(this.state.markers), obj)
        });
    }

    upsetArray(array, obj) {
        const arr = [].concat(array);
        if (!obj.deviceId) return;
        const filterResult = arr ? _.filter(arr, val => val.deviceId && val.deviceId === obj.deviceId) : [];
        if (size(filterResult)) {
            _.map(arr, (val, index) => val.deviceId === obj.deviceId ? arr[index] = objectAssignDeep({}, val, obj) : '');
        } else {
            arr.push(objectAssignDeep(obj, {data: {status: 'newDevice'}}));
        }
        this.updateBoard(obj);
        return arr;
    }

    updateBoard(obj) {
        this.setState({
            stats: objectAssignDeep({}, this.state.stats, {
                digging: obj.data.status === 'digging' ? this.state.stats.digging + 1 : this.state.stats.digging,
                winner: obj.data.found && obj.eventName === "treasure" ? this.state.stats.winner + 1 : this.state.stats.winner,
                captain: this.getValidUserCount()
            })
        });
    }

    getQueryStringObject() {
        return queryString.parse(window.location.search)
    }

    cargoHandler(count, delay) {
        this.cargo = asyncTimedCargo((tasks, callback) => {
            const newState = size(tasks) &&
                tasks.reduce((state, task) =>
                task &&
                task.deviceId &&
                this.upsetArray(state || [], task), this.state.markers);
            this.setState({
                markers: newState
            });
            return callback();
        }, count, delay);
    }


    componentDidMount() {
        const queryStringObject = this.getQueryStringObject();
        this.options = 'dev' in queryStringObject ? config.DEVELOPMENT : config.PRODUCTION;
        if ('location' in queryStringObject) {
            const centerLocationObject = queryStringObject.location.split(',');
            this.setState({center: {lat: +centerLocationObject[0], lng: +centerLocationObject[1]}});
        }
        this.getStoreData();
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
        const props = Object.assign(size(this.state.center) && {
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
