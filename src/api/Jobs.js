import { handleRequest } from '../utils/request';
import Base              from './Base';

class Jobs extends Base {
    list = async () => {
        const data = await handleRequest(this.apiClient.get('jobs'));

        return data;
    };
}

export default Jobs;
