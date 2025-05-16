import axios from 'axios';
import {cache} from '@communityox/ox_lib';

const API = axios.create({
   baseURL: `https://127.0.0.1:40120/${cache.resource}/`,
   headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
   },
})

export default API;