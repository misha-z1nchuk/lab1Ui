import ApiClient  from './ApiClient';
import SessionAPI from './Session';
import ProfileAPI from './Profile';
import Contacts   from './Contacts.js';

export default function apiFactory({ apiPrefix } = {}) {
    if (!apiPrefix) {
        throw new Error('[apiPrefix] required');
    }

    const api = new ApiClient({ prefix: apiPrefix });

    return {
        apiClient : api,
        session   : new SessionAPI({ apiClient: api }),
        profile   : new ProfileAPI({ apiClient: api }),
        contacts  : new Contacts({ apiClient: api })
    };
}
