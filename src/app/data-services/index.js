import axios from 'axios';

export function getUsers(page, per_page = 10) {
    return axios({
        method: 'Get',
        url: `https://reqres.in/api/users`,
        params: {
            page,
            per_page
        }
    })
        .then(res => res.data)
        .catch(err => err);
}