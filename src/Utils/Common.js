// return the user data from the session storage
  export const getNOKP = () => {
    const userStr = sessionStorage.getItem('nokp');
  }

  export const getUser = () => {
    const userStr = sessionStorage.getItem('username');
  }
  
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token');
  }

  export const getEmail = () => {
    return sessionStorage.getItem('email');
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('nokp');
    sessionStorage.removeItem('email');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, username, nokp, email) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('nokp', nokp);
    sessionStorage.setItem('email', email);
  }