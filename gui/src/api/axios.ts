import axios from 'axios';
import { cache } from '@overextended/ox_lib';

const API = axios.create({
   baseURL: `https://127.0.0.1:40120/${cache.resource}/`
})

export default API;