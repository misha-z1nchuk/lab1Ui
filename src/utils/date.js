import moment from 'moment';
import 'moment-timezone';

export function momentDate(date, format = '') {
    return moment(date, format);
}

export function momentUTCDate(date, format = 'DD.MM.YYYY') {
    return moment.utc(date, format);
}

export function formatDate(date, format = 'DD.MM.YYYY') {
    return moment(date).format(format);
}

export function formatMessageDate(date, format = 'DD.MM.YYYY HH:mm') {
    return moment(date).format(format);
}

