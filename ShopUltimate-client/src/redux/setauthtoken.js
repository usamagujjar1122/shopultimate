import axios from 'axios'


const setauthtoken = token =>{
    if (token) {
        axios.defaults.headers.common['x_auth'] = token
        
    }
    else{
        delete axios.default.headers.common['x_auth']
        localStorage.removeItem('token');

    }
}

export default setauthtoken;