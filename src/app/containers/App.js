import React, {Component} from 'react';
import '../assets/css/App.css';
import Map from '../components/Map'
import Board from '../components/Board'
import chabokpush from 'chabokpush';
import Storage from '../helper/Storage';

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
        console.log('---------------nextState.markers.length---------------------');
        console.log(nextState.markers)
        console.log('------------------------------------------');

        // nextState.markers.length ? Storage.set('geo', this.cloneDeep(nextState.markers)) : null;
    }

    chabok() {
        const options = {
            appId: 'chabok-demo',
            apiKey: '779e1bf80d61d8750ca2ee8fb05dfd43daa5b092',
            username: 'chabokdemo',
            password: 'chabokdemo',
            devMode: false
        };
        // const options = {
        //     appId: 'adp-nms-push',
        //     apiKey: 'c89cd1703981e6efe5afb8d28a5f4ac418f29e2b',
        //     username: 'adp',
        //     password: 'test',
        //     devMode: true
        // };
        const push = new chabokpush.Chabok(options)

        push.on('registered', deviceId => console.log('DeviceId ', deviceId))
        push.on('connected', _ => {
            console.log('Connected')
            push.enableDeliveryForEvent('geo')
            push.on('geo', geoEvent => {
                console.log('Geo Event ', geoEvent);
                this.setState({
                    // stats: Object.assign({}, this.state.stats, {[location.status]: ++this.state.stats[location.status]}),
                    markers: this.upsetArray(this.state.markers, Object.assign(geoEvent))
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
        // const markers = Storage.get('geo');
        // console.log('---------------markers---------------------');
        // console.log(this.state.markers,markers);
        // console.log('------------------------------------------');

        // markers.length ? this.setState({markers: [...this.state.markers, ...markers]}) : null;
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
