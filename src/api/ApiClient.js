import { getSearchParams }   from '../utils/helpers';
import config                from '../config';
import { getSessionStorage } from '../utils/storage';

export default class ApiClient {
    constructor({ prefix = 'api/v1/' } = {}) {
        this.prefix = prefix;
    }

    async get(url, params = {}) {
        return this.request({
            url,
            params,
            method : 'GET'
        });
    }

    async post(url, payload = {}) {
        return this.request({
            url,
            method : 'POST',
            body   : payload
        });
    }

    async put(url, payload = {}) {
        return this.request({
            url,
            method : 'PUT',
            body   : payload
        });
    }

    async patch(url, payload = {}) {
        return this.request({
            url,
            method : 'PATCH',
            body   : payload
        });
    }

    async delete(url, payload = {}) {
        return this.request({
            url,
            method : 'DELETE',
            body   : payload
        });
    }

    async import(url, files = []) {
        const formData = new FormData();

        (files || []).forEach(file => {
            formData.append('file', file?.originFileObj || file);
        });

        return this.request({
            url,
            formData,
            method : 'POST'
        });
    }

    async fileUpload(url, fileData) {
        return this.request({
            url,
            formData : fileData,
            method   : 'POST'
        });
    }

    async fileUpdate(url, fileData) {
        return this.request({
            url,
            formData : fileData,
            method   : 'PATCH'
        });
    }

    async fileDownload(url) {
        return this.request({
            url,
            method       : 'GET',
            responseType : 'blob'
        });
    }

    async request({ url, method, body, formData, params = {}, responseType = 'json' }) {
        const query = Object.keys(params).length ? getSearchParams(params) : '';

        const response = await fetch(
            `${config.apiUrl}${this.prefix}${url}${query}`,
            {
                method,
                headers : {
                    Authorization : getSessionStorage('token'),
                    ...(!formData ? { 'Content-Type': 'application/json' } : undefined)
                },
                body        : formData || JSON.stringify(body),
                credentials : 'include'
            }
        );

        const data = await response[responseType]();

        // eslint-disable-next-line no-magic-numbers
        if (response?.status >= 400 || data?.status === 0) {
            throw data;
        }

        return data;
    }
}
