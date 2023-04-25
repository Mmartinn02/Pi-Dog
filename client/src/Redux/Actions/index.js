import axios from 'axios'
export const GET_INITIAL_DATA = 'GET_INITIAL_DATA'
export const GET_ALL_DOGS = 'GET_ALL_DOGS'
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS'
export const FILTER_DOG_NAME = 'FILTER_DOG_NAME'
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const POST_DOG = 'POST_DOG'
export const SORT_DOGS = 'SORT_DOGS'

export function getInitialData() {
    return async function (dispatch) {
        const {data: dogsData} = await axios.get('/dogs')
        const {data: temperamentsData} = await axios.get('/temperaments')
        return dispatch({
            type: GET_INITIAL_DATA,
            payload: {dogsData, temperamentsData}
            })
    }

}

export function getAllDogs () {
    return async function (dispatch) {
        var json = await axios.get('/dogs');
        return dispatch({
            type: GET_ALL_DOGS,
            payload: json.data
            })
        }
}

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get('/temperaments')
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: json.data
        })
    }
}

export function filterByDogName(name) {
    return async function (dispatch) {
        try{
            var json = await axios.get(`/dogs?name=${name}`)
            return dispatch({
                type: FILTER_DOG_NAME,
                payload: {dogs: json.data, filterValue: name}
            })
        } catch(error){
            alert('The dog could not be found')
        }
    }
}

export function getDog(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/dogs/${id}`);
            return dispatch({
                type: GET_DOG_DETAIL,
                payload: json.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}


export function postDog (data){
    try{
        return async function () {
            const posted = await axios.post('/dogs', data);
            return posted
        }
    } catch(error) {
        alert('The dog could not be created')
    }
}

export function updateFilter(payload) {
    return {
        type: UPDATE_FILTER,
        payload
    }
}

export function sortDogs(payload) {
    return {
        type: SORT_DOGS,
        payload
    }
}
