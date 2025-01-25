import axios from 'axios';

// Create an axios instance with base configuration
export const api = axios.create({
  baseURL: 'https://todo-list-api-mfchjooefq-as.a.run.app/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
