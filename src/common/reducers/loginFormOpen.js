function loginFormOpen(state = false, action) {
  switch (action.type) {
    case 'OPEN_LOGIN_FORM':
      return true;
    case 'CLOSE_LOGIN_FORM':
      return false;
    default:
      return state;
  }
}

export default loginFormOpen;
