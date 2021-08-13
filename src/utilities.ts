import { API_KEY, API_BASE_URL, API_MEDIA_URL } from '@env';

const buildApiUrl = (resource: string, params?: any) =>{
    let queryString = "?";
    for(let key in (params || {})){
        queryString += `${key}=${params[key]}`;
        queryString += "&";
    }

    queryString += `api_key=${API_KEY}`;

    return `${API_BASE_URL}/${resource}${queryString}`;

};

const buildMediaUrl = (resource: string, size: number) => {
    return `${API_MEDIA_URL}/w${size}${resource}`;
}

export default {
    buildApiUrl,
    buildMediaUrl
}