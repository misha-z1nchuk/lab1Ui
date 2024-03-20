const SORT_BY = {
    date : 'startAt'
};

export function changeQuery(query, defaultQuery = {}) {
    if (!query) return;

    const {
        page, perPage,
        sortBy, orderBy,
        ...rest
    } = query;

    return {
        sortBy  : SORT_BY[sortBy] || sortBy,
        limit   : perPage,
        offset  : (page - 1) * perPage,
        orderBy : orderBy?.toUpperCase(),
        ...defaultQuery,
        ...rest
    };
}

export function changeLogsQuery(query) {
    const normalQuery = changeQuery(query);

    if (!normalQuery) return;

    const { user, role, loyal, ...rest } = normalQuery;

    return {
        entityId : [ user, role, loyal ].filter(Boolean),

        ...rest
    };
}
