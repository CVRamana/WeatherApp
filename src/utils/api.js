import { create } from 'apisauce'
// define the api
const api = create({
    baseURL: 'https://api.github.com',
    headers: { Accept: 'application/vnd.github.v3+json' },
})
// api
//     .get('/repos/skellock/apisauce/commits')
//     .then(response => response.data[0].commit.message)
//     .then(console.log)

// // customizing headers per-request
// api.post('/users', { name: 'steve' }, { headers: { 'x-gigawatts': '1.21' } })

//for making POST Api calls

const postApiCall = (endPoint, data, successCallback, errorCallback) => {
    api.post(endPoint, data)
        .then((response) => {
            successCallback(response);
        })
        .catch((error) => {
            console.log("error.response", error.response)
            errorCallback(error);
        })
}

//for making GET Api calls
const getApiCall = (endPoint, params, successCallback, errorCallback) => {
    api.post(endPoint, params)
        .then((response) => {
            successCallback(response);
        })
        .catch((error) => {
            console.log("error.response", error.response)
            errorCallback(error);
        })
}
export default{
    postApiCall,
    getApiCall
}