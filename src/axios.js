import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://bigerp.nour-projects.com/pos'
    ,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }   
  });
  export default instance;