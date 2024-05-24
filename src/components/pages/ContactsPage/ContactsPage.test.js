import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import api from '../../../apiSingleton';
import { sleep } from '../../../utils/helpers';
import ContactsPage from './ContactsPage';

// Mock the API module
jest.mock('../../../apiSingleton', () => ({
    contacts : {
        list : jest.fn().mockResolvedValue([
            { id: 1, firstName: 'John', lastName: 'Doe', phone: '1234567890', createdAt: '2024-05-23T12:00:00Z' }
            // Add more mock contacts as needed
        ])
        // Mock other functions as needed
    }
}));

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable : true,
        value    : jest.fn().mockImplementation(query => ({
            matches             : false,
            media               : query,
            onchange            : null,
            addListener         : jest.fn(), // deprecated
            removeListener      : jest.fn(), // deprecated
            addEventListener    : jest.fn(),
            removeEventListener : jest.fn(),
            dispatchEvent       : jest.fn()
        }))
    });
});

// Initialize mock store
const mockStore = configureStore([]);
const store = mockStore({
    sessions : {
        userData : {} // Provide initial state here
    }
});

describe('ContactsPage Component', () => {
    beforeEach(() => {
        // Clear any mocks and reset state between tests
        jest.clearAllMocks();
    });

    test('renders ContactsPage component with correct content', async () => {
        // Render the component
        const { getByText } = render(<Provider store={store}>
            <ContactsPage />
        </Provider>);

        // Wait for async operations to complete
        await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));

        // Assert that the correct data is displayed
        expect(getByText('John')).toBeInTheDocument();
        expect(getByText('Doe')).toBeInTheDocument();
        expect(getByText('1234567890')).toBeInTheDocument();
        expect(getByText('2024-05-23T12:00:00Z')).toBeInTheDocument();
    });

    test('opens create contact modal when "Create" button is clicked', async () => {
        // Render the component
        const { getByText } = render(<Provider store={store}>
            <ContactsPage />
        </Provider>);

        // Click on the "Create" button
        fireEvent.click(getByText('Create'));

        // Assert that the create contact modal is rendered
        await waitFor(() => expect(getByText('Create Contact')).toBeInTheDocument());
    });

    test('opens edit contact modal when "Edit" link is clicked', async () => {
        // Render the component
        const { getByText } = render(<Provider store={store}>
            <ContactsPage />
        </Provider>);

        // Wait for async operations to complete
        await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));

        // Click on the "Edit" link in the table row
        fireEvent.click(getByText('Edit'));

        // Assert that the edit contact modal is rendered
        await waitFor(() => expect(getByText('Edit contact')).toBeInTheDocument());
    });
});
