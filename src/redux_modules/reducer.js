import {SAVE_WEATHER_DATA} from "./type";

const initialState = {
   data:{
      
   }
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_WEATHER_DATA:
            return {
                ...state,
                data:action.weatherData
            }
        default:
            return state
    }
}
export default reducer
