const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
