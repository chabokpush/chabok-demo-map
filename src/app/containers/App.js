import React, {Component} from 'react';
import '../assets/css/App.css';
import Map from '../components/Map'
import Board from '../components/Board'
import chabokpush from 'chabokpush';
import Storage from '../helper/Storage';
import config from '../config/chabok.json';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            markers: [],
            stats: {
                captain: 0,
                idle: 0,
                digging: 0,
                winner: 0,
            }
        }
    }

    cloneDeep(val) {
        return JSON.parse(JSON.stringify(val))
    }


    componentWillUpdate(nestProps, nextState) {
        nextState.markers.length ? Storage.set(this.options.appId, this.cloneDeep(nextState.markers)) : null;
    }

    generateRandomStatus(){
        const statusArr=['walking','typing', 'sent', 'kolang', 'win'];
        return statusArr[Math.floor(Math.random() * statusArr.length)]
    }

    chabok() {
        const push = new chabokpush.Chabok(this.options);
        push.on('registered', deviceId => console.log('DeviceId ', deviceId))
        push.on('connected', _ => {
            console.log('Connected')
            push.enableDeliveryForEvent('geo')
            push.on('geo', geoEvent => {
                console.log('Geo Event ', geoEvent);
                this.setState({
                    // stats: Object.assign({}, this.state.stats, {[location.status]: ++this.state.stats[location.status]}),
                    markers: this.upsetArray(this.state.markers, Object.assign(geoEvent, {
                        status: this.generateRandomStatus()
                    }))
                })
            })
        });
        push.on('message', msg => console.log('Message ', msg))

        push.register('989120032217')


    }

    upsetArray(array, obj) {
        const arr = [].concat(array);
        const filterResult = arr.filter(val => obj.channel && val.channel === obj.channel);
        if (filterResult.length) {
            arr.map((val, index) => val.channel === obj.channel ? arr[index] = Object.assign(val, obj) : '');
        } else {
            arr.push(obj)
        }
        this.setState({
            stats: Object.assign(this.state.stats, {
                captain: arr.length
            })
        });
        return arr;
    }

    componentDidMount() {
        this.options = window.location.search.slice(1).split('=')[0] === 'dev' ? config.DEVELOPMENT : config.PRODUCTION;
        const markers = Storage.get(this.options.appId);
        markers ? this.setState({markers: markers}) : null;
        this.chabok();
    }

    render() {
        return (
            <div className="App">
                <Board data={this.state.stats}/>
                <Map markers={this.state.markers}/>
            </div>
        );
    }
}
