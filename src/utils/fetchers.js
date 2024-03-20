import api from '../apiSingleton';

async function fetchApplicationProfiles() {
    const list = await api.references.applicationProfiles();

    return list.map(item => ({
        option : item.id,
        label  : item.name
    }));
}

function fetchEnums(type) {
    return async () => {
        const list = await api.references.enums({ type });

        return list.map(({ value, ...rest }) => ({
            option : value,
            ...rest
        }));
    };
}

export default {
    fetchApplicationProfiles,
    fetchEnums
};
