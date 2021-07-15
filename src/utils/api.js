import { create } from 'apisauce'


const url = 'https://openweathermap.org'
const apiKey='d54fcf5fca82fa199c6765c4ea8145b3'

const api = create({
    baseURL: url,
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
})

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
export default {
    postApiCall,
    getApiCall
}