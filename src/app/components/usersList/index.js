import React, {Component} from 'react';

const Item = ({firstName, lastName, avatar}) => {
    return (
        <li><img src={avatar} alt={lastName}/> {firstName} {lastName}</li>
    )
};

export default class UsersList extends Component {
    render() {
        const {data} = this.props;
        return (
            <ul className="user-list">
                { data.map(item => (
                    <Item avatar={item.avatar}
                          firstName={item.first_name}
                          lastName={item.last_name}
                          key={item.id}/>))}
            </ul>
        )
    }

}