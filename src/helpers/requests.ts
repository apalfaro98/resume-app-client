import axios, { type AxiosRequestConfig } from 'axios';

const cvApi = axios.create({
    baseURL: 'http://localhost:3000/api',
});

cvApi.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers!['Authorization'] = localStorage.getItem('token');

    return config;
});

const auth = async (email: string, password: string) => {
    const resp = await cvApi.post('/users/auth', {
        email,
        password,
    });
    const data = resp.data;
    return data;
};

// const getEstadistica = async () => {
//     const resp = await museoApi.get('/estadistica');
//     const data = resp.data;
//     return data;
// };

// const getArmas = async () => {
//     const resp = await museoApi.get('/armas');
//     const data = resp.data;
//     return data;
// };

// const getOneArma = async (id) => {
//     const resp = await museoApi.get(`/armas/${id}`);
//     const data = resp.data;
//     return data;
// };

// const createArma = async (arma = {}, image) => {
//     const resp = await museoApi.post(
//         '/armas',
//         {
//             ...arma,
//             image,
//         },
//         {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         }
//     );
//     const data = resp.data;
//     return data;
// };

// const updateArma = async (arma = {}) => {
//     const resp = await museoApi.put(`/armas/${arma._id}`, {
//         ...arma,
//     });
//     const data = resp.data;
//     return data;
// };

// const deleteArma = async (id) => {
//     const resp = await museoApi.delete(`/armas/${id}`);
//     const data = resp.data;
//     return data;
// };

export default {
    auth
};
