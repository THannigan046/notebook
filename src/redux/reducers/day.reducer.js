const dayReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED_DAY':
            return action.payload;
        case 'UNSET_DAY':
            return [];
        default:
            return state;
    }
}

export default dayReducer;