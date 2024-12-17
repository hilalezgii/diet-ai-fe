import {serviceUrl} from "../constants";
import {toast} from "react-toastify";
import {useState} from "react";

interface Props {
    url: string;
    method: string;
    data?:unknown;
}

export const useFetch= () => {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const token = localStorage.getItem('token');

    const _fetch = async({url,method,data}:Props) => {
        setIsLoading(true);
        const response = await fetch(`${serviceUrl}/${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(data),
        });

        const _response = await response.json();


        if (_response?.message==='Unauthorized') {
            localStorage.removeItem('token');
            toast.error('Oturum süreniz dolmuştur. Lütfen tekrar giriş yapınız.')

        }

        setIsLoading(false);

        return _response;
    }


    return {
        _fetch,
        isLoading,
    };
}