import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage Component', () => {
    test('renders AboutPage component with correct content', () => {
        render(<AboutPage />);

        // Check if the About heading is present
        expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();

        // Check if the welcome message is present
        expect(screen.getByText(/welcome to our contact management application/i)).toBeInTheDocument();

        // Check if all the features are present
        expect(screen.getByText(/add new contacts effortlessly/i)).toBeInTheDocument();
        expect(screen.getByText(/update contact information with ease/i)).toBeInTheDocument();
        expect(screen.getByText(/delete contacts quickly/i)).toBeInTheDocument();
        expect(screen.getByText(/search and filter contacts efficiently/i)).toBeInTheDocument();

        // Check if the logo is present
        // const logo = screen.getByAltText('logo');

        // expect(logo).toBeInTheDocument();
        // expect(logo).toHaveAttribute('src', 'path/to/your/logo/image');
        // expect(logo).toHaveAttribute('height', '93');
        // expect(logo).toHaveAttribute('width', '96');
    });
});
