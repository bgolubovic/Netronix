export function changeData(response){
    return{
        type: "RECEIVE_DATA",
        payload: response
    }
}
