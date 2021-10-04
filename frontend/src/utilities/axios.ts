import axios from 'axios';

const isntance = axios.create({
  baseURL: `http://localhost:8000/api/tasks`,
});

export default isntance;
