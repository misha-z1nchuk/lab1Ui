import { useSelector } from 'react-redux';

export function useUser() {
    return useSelector(state => {
        return state.sessions.userData;
    });
}

