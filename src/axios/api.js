import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function(config) {
    return config;
}, function(err) {
    return Promise.reject(err)
})

axios.interceptors.response.use(function(response) {
    return response
}, function(err) {
    return Promise.reject(err);
})

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(response => {
            resolve(response.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export default {
    mockdata(url, params) {
        return fetch(url, params)
    }
}