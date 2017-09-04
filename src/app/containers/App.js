import React, {Component} from 'react';
import '../assets/css/App.css';
import Map from '../components/Map'
import Board from '../components/Board'
import {getLocation} from '../mock-services';

class App extends Component {

    constructor() {
        super();
        this.state = {
            markers: [],
            stats: {
                seeking: 0,
                idle: 0,
                digging: 0,
                winner: 0,
            }
        }
    }

    upsetArray(array, obj) {
        const arr          = [].concat(array);
        const filterResult = arr.filter(val => obj.id && val.id === obj.id);
        if (filterResult.length) {
            arr.map((val, index) => {
                val.id === obj.id ? arr[index] = Object.assign(val, obj) : ''
            });
        } else {
            arr.push(obj)
        }
        return arr;
    }

    componentDidMount() {
        setInterval(_ => getLocation(location => {
            this.setState({
                stats: Object.assign({}, this.state.stats, {[location.status]: ++this.state.stats[location.status]}),
                markers: this.upsetArray(this.state.markers, location)
            })
        }), 250)
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

export default App;
