import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        clearData: () => {
            return initialState
        },
        inputId: (state, action) => {
            return { ...state, objectId: action.payload }
        },
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1 }
        },
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1 }
        }
    }
})

export const { setData, clearData, incrementId, decrementId, inputId } = dataSlice.actions
//Build and export a Thunk Action Creator, we can call it fetchData.
export const fetchData = () => {
    //Inside of the Action creator, define an async function; the Thunk itself. We can call this function "dataThunk". Remember this function needs to take in two arguments: dispatch and getState
    const fetchDataThunk = async (dispatch, getState) => {
        //Having access to getState is going to be critical in this case, after all; we're storing the objectId that will drive our API results inside of state! Start off by familiarizing yourself with the nature of the Thunk by assigning the result of getState() to a variable named "state" inside of the Thunk
        let state = getState()
        //console.log(state)
        //Inside of the Thunk, we've seen that we can write any pertinent logic. In this case, we want to write code to fetch data from the Metropolitan Museum of Art API, using the URL above. Plug your objectId from state into the URL where indicated.
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        //convert your response to json format!
        const rData = await response.json()
        //test with console.log to makre sure your getting back data as a response
        //console.log(rData)
        dispatch(setData(rData))
    }
    //Finally, outside of the Thunk function, but inside of the Thunk Action Creator, return dataThunk!
    return fetchDataThunk
}

export default dataSlice.reducer