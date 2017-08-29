import React, {Component} from 'react';

export default class Pagination extends Component {
    render() {
        const {count, total, onPageSelect, current} = this.props;
        const pages                                 = Math.ceil(total / count);
        return (
            <ul className="pagination">
                { [...Array(pages)].map((page, index) => (
                    <li key={`pg-${index}`}
                        className={current === index + 1 ? 'active' : ''}
                        onClick={() => onPageSelect(index + 1)}>{index + 1}</li>))}
            </ul>
        )
    }
}