
const DEFAULT_10_QUERY = {
    query : {
        page    : 1,
        perPage : 10,
        orderBy : 'DESC',
        sortBy  : 'createdAt'
    }
};

export const DASHBOARD_QUERY_DATA = {
    query : {
        ...DEFAULT_10_QUERY.query,
        perPage : 50,
        sortBy  : 'updatedAt'
    }
};


export const DEFAULT_ROUTES_DATA = {

};
