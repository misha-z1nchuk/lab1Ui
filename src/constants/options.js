export function getAplicationOptions() {
    return [
        { option: 'PERSON', label: 'Person' },
        { option: 'COMPANY', label: 'Company' }
    ];
}

export function getDocumentType() {
    return [
        { option: 'PASSPORT', label: 'Passport' },
        { option: 'IDENTIFICATION_CARD', label: 'Identifaction card' },
        { option: 'RESIDENCE_PERMIT', label: 'Residence permit' }
    ];
}

export function getIncomeRange() {
    return [
        { option: 100000, label: '100 000' },
        { option: 500000, label: '500 0000' },
        { option: 1000000, label: '1000 0000' }
    ];
}

export function getIncomeSource() {
    return [
        { option: 'test1', label: 'test1' },
        { option: 'test2', label: 'test2' },
        { option: 'test3', label: 'test3' }
    ];
}

export function getBankingService() {
    return [
        { option: 'service1', label: 'service1' },
        { option: 'service2', label: 'service2' },
        { option: 'service3', label: 'service3' }
    ];
}

export function getDeliveryChanel() {
    return [
        { option: 'AGENT', label: 'AGENT' },
        { option: 'DIRECT', label: 'DIRECT' }
    ];
}

export function getCountryOptions(countries) {
    return countries.map(item => ({
        option : item.code,
        label  : item.name
    }));
}
