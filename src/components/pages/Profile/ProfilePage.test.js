import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUser } from '../../../hooks';
import ProfilePage from './ProfilePage';

// Mock the useUser hook
jest.mock('../../../hooks', () => ({
    useUser : jest.fn()
}));

// Mock window.matchMedia
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


describe('ProfilePage Component', () => {
    const mockUser = {
        id        : '123',
        name      : 'John Doe',
        gender    : 'Male',
        email     : 'john.doe@example.com',
        birthDate : '1990-01-01'
    };

    beforeEach(() => {
        useUser.mockReturnValue(mockUser);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders profile page header', () => {
        render(<ProfilePage />);
        expect(screen.getByText('Profile page')).toBeInTheDocument();
    });

    test('renders table with user data', () => {
        render(<ProfilePage />);

        const attributes = [ 'ID', 'Name', 'Gender', 'Email', 'Birth Date' ];
        const values = [ '123', 'John Doe', 'Male', 'john.doe@example.com', '1990-01-01' ];

        attributes.forEach((attribute) => {
            expect(screen.getByText(attribute)).toBeInTheDocument();
        });

        values.forEach((value) => {
            expect(screen.getByText(value)).toBeInTheDocument();
        });
    });

    test('renders "N/A" for missing fields', () => {
        useUser.mockReturnValueOnce({
            ...mockUser,
            gender : undefined
        });

        render(<ProfilePage />);

        expect(screen.getByText('Gender')).toBeInTheDocument();
        expect(screen.getByText('N/A')).toBeInTheDocument();
    });
});
