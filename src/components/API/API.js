import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'https://192.168.178.53:9090/gamefully/'
});

instance.interceptors.request.use(config => {
    config.headers = {
        Authorization: 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'application/json'


    }
    return config
});

export default instance;

