import axios from 'axios';

export default axios.create({
    baseURL: 'https://usbn.herokuapp.com/api/v1/'
});