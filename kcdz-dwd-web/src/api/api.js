import axios from 'axios';

let base = 'http://localhost:54942/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// export const requestLogin = param => { return axios.get(`${base}/Login`, { params: param }); };
export const requestLogin = param => { return axios.post(`${base}/Login`, param).then(res => res.data); };
export const requestEquipment = param => { return axios.post(`${base}/EquipmentLedger`, param).then(res => res.data); };