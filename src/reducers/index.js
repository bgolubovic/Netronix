const initialState = {
    fetching: false,
    fetched: false,
    measurements: [],
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_DATA_START":
            return{...state, fetching: true};
        case "FETCH_DATA_ERROR":
            return{...state, fetching: false, error: action.payload};
        case "RECEIVE_DATA":
            return{
                ...state, 
                fetching: false, 
                fetched: true, 
                measurements: action.payload
            };
        default:
            break;
      }
  return state;
};

export default reducer;