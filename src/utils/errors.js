export default class ErrorService {
    static getCorrectErrorWithFields(errors) {
        const errorFields = {};


        errors.forEach(element => {
            errorFields[element.uri.split('#/').pop()] = element.message;
        });

        return errorFields;
    }
}
