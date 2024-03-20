// AboutPage.js
import React from 'react';
import { Icons } from '../../../constants/index';

const aboutPageStyle = {
    textAlign    : 'center',
    maxWidth     : '800px',
    margin       : 'auto',
    padding      : '20px',
    border       : '2px solid #ccc',
    borderRadius : '8px'
};

function AboutPage() {
    return (
        <div>
            <div style={aboutPageStyle}>
                <h2>About</h2>
                <p>Welcome to our contact management application!</p>
                <p>This application provides an easy way to manage your contacts. With our intuitive interface, you can:</p>
                <ul>
                    <li>Add new contacts effortlessly</li>
                    <li>Update contact information with ease</li>
                    <li>Delete contacts quickly</li>
                    <li>Search and filter contacts efficiently</li>
                </ul>
                <p>Whether you're a busy professional, a student, or anyone who needs to keep track of contacts, our app is designed to simplify the process for you.</p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Icons.Logo
                    style={{ height: 93, width: 96 }}
                />
            </div>
        </div>
    );
}

export default AboutPage;
