import axios, { type AxiosRequestConfig } from 'axios';
import type AllResumes from '@/interfaces/allResumes';
import type OneResume from '@/interfaces/oneResume';
import type CreateResume from '@/interfaces/createResume';

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

const createAccount = async (email: string, password: string) => {
    const resp = await cvApi.post('/users/', {
        email,
        password,
    });
    const data = resp.data;
    return data;
};


const getParams = (abilities?: string[], minAge?: number, maxAge?: number) => {
    let params = '';
    if(abilities || minAge || maxAge){
        params += '?'
    }
    if(abilities){
        abilities.forEach(ability => {
            params+=`abilities=${ability}&`
        })
    }
    if(minAge){
        params+=`minAge=${minAge}&`
    }
    if(maxAge){
        params+=`maxAge=${maxAge}&`
    }

    params = params.slice(0, -1);

    return params;
}

const getAll = async (abilities?: string[], minAge?: number, maxAge?: number) => {
    const queries = getParams(abilities, minAge, maxAge)
    const resp = await cvApi.get(`/resumes${queries}`);
    const data = resp.data as AllResumes[];
    return data;
};

const getOne = async (id: string) => {
    const resp = await cvApi.get<OneResume>(`/resumes/${id}`);
    const data = resp.data;
    return data;
};

const deleteCV = async (id: string) => {
    const resp = await cvApi.delete(`/resumes/${id}`);
    const data = resp.data;
    return data;
};


const createCV = async (resume: CreateResume, image?: File) => {
    if(image){
        const resp = await cvApi.post(
            '/resumes',
            {
                ...resume,
                image,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        const data = resp.data;
        return data;
    } else{
        const resp = await cvApi.post(
            '/resumes',
            resume,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        const data = resp.data;
        return data;
    }
};

// const updateArma = async (arma = {}) => {
//     const resp = await museoApi.put(`/armas/${arma._id}`, {
//         ...arma,
//     });
//     const data = resp.data;
//     return data;
// };

export default {
    auth,
    createAccount,
    getAll,
    getOne,
    createCV,
    deleteCV
};
