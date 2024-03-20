import Base                    from './Base';

class Session extends Base {
    create = async body => {
        const data = await this.apiClient.post('login', body);

        return data;
    };

    registration = async body => {
        const data = await this.apiClient.post('registration', body);

        return data;
    };
}

export default Session;
