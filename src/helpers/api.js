import axios from 'axios';
import API_URL from './consts/API_URL'

export default axios.create({
  baseURL: API_URL,
});
