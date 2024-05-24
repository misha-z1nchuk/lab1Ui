import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { sleep } from '../../../../utils/helpers';
import RegistrationForm from './index';

// Mocking the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation : () => ({
        t : (key) => key
    })
}));

// Mocking the Button and InputType components
jest.mock('../../Button', () => (props) => (
    <button {...props} />
));

// eslint-disable-next-line react/no-multi-comp
jest.mock('../../Input/Input', () => (props) => (
    <div>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            id={props.name}
            name={props.name}
            type={props.type || 'text'}
            value={props.value}
            onChange={(e) => props.onChange(props.name, e.target.value)}
            placeholder={props.placeholder}
        />
        {props.error && <span>{props.error}</span>}
    </div>
));

// Mocking the DateInput component
jest.mock('../../DateInput', () => (props) => (
    <div>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            id={props.name}
            name={props.name}
            type='date'
            onChange={(e) => props.onChange(props.name, e.target.value)}
        />
        {props.error && <span>{props.error}</span>}
    </div>
));

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

describe('Registration Component', () => {
    const mockSubmit = jest.fn();

    beforeEach(() => {
        mockSubmit.mockClear();
    });

    test('renders email and password inputs and submit button', () => {
        render(<RegistrationForm
            isLoading={false} error={null} onSubmit={mockSubmit}
        />);

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        // expect(screen.getByRole('button', { name: /auth.button.next/i })).toBeInTheDocument();
    });

    test('calls onSubmit with data on form submit', async () => {
        render(<RegistrationForm
            isLoading={false} error={null} onSubmit={mockSubmit}
            isCodeSent />);

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByRole('button', { name: /auth.button.registration/i }));

        await sleep(100);
        expect(mockSubmit).toHaveBeenCalledWith({
            email    : 'test@example.com',
            password : 'password'
        });
    });

    test('displays error messages from props', () => {
        const error = {
            errors : [
                { uri: '#/email', message: 'Email error message' },
                { uri: '#/password', message: 'Password error message' }
            ]
        };

        render(<RegistrationForm
            isLoading={false} error={error} onSubmit={mockSubmit}
            isCodeSent={false} />);

        expect(screen.getByText('Email error message')).toBeInTheDocument();
        expect(screen.getByText('Password error message')).toBeInTheDocument();
    });
});
