import axios from 'axios';

const API = 'http://www.colr.org/json/color/random';

export const  fetch = () => {
    return(dispatch)=>{
        return axios.get(API)
        .then((response)=>{
            dispatch(changeData(response.data.new_color));
        });
    };
  };

  export function changeData(response){
    return{
        type: "RECEIVE_DATA",
        payload: response
    }
}
