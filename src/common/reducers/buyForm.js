const initialState = {
  open: false,
  packageId: 'all',
  bought: false
};

function buyForm(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_BUY_FORM':
      return {
        ...state,
        open: true,
        packageId: action.packageId
      };
    case 'CLOSE_BUY_FORM':
      return {
        ...state,
        open: false
      };
    case 'MARK_BUY_FORM_AS_FINISHED':
      return {
        ...state,
        bought: true
      };
    default:
      return state;
  }
}

export default buyForm;
