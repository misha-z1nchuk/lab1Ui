import { NAME_MAX_LENGTH } from './constants';

export function formatFullName(fullName) {
    return  fullName.length > NAME_MAX_LENGTH ? `${fullName.slice(0, NAME_MAX_LENGTH)}...` : fullName;
}
