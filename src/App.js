/* eslint-disable react/no-multi-comp, react/prop-types, max-lines-per-function */
import React                        from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES }                   from './constants';
import { history }                  from './utils/history';
import BrowserRouter                from './components/layouts/BrowserRouter';
import AuthLayout                   from './components/layouts/AuthLayout';
import MainLayout                   from './components/layouts/MainLayout';
import LoginPage                    from './components/pages/Auth/LoginPage';
import AuthPage                     from './components/pages/Auth/AuthPage';
import RegistrationPage from './components/pages/Auth/RegistrationPage';
import ProfilePage from './components/pages/Profile/ProfilePage';
import AboutPage from './components/pages/About/AboutPage';
import ContactsPage from './components/pages/ContactsPage/ContactsPage';
import SharedContactsPage from './components/pages/SharedContactsPage/SharedContactsPage';
import OnlineUsersPage from './components/pages/OnlineUsersPage/OnlineUsersPage';
import JobsPage from './components/pages/JobsPage/JobsPage';

function dummyLayout(props) {
    return props.children;
}

function PrivateRoute({ component: Page, keyProp, layout, ...props }) {
    const Layout = layout || dummyLayout;

    return (
        <MainLayout>
            <Layout>
                <Page key={keyProp} {...props} />
            </Layout>
        </MainLayout>
    );
}

function AppRoute({ component: Page }) {
    return (
        <MainLayout>
            <Page />
        </MainLayout>
    );
}

function App() {
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route
                    path    = {ROUTES.AUTH}
                    element = {<AppRoute component={AuthPage} />}
                />
                <Route
                    path   = {ROUTES.LOGIN}
                    element = {<AppRoute component={LoginPage} />} />
                <Route
                    path   = {ROUTES.REGISTRATION}
                    element = {<AppRoute component={RegistrationPage} />} />
                <Route
                    path   = {ROUTES.HOME}
                    element = {<PrivateRoute layout={AuthLayout} component={ContactsPage} />} />
                <Route
                    path   = {ROUTES.SHARED_CONTACTS}
                    element = {<PrivateRoute layout={AuthLayout} component={SharedContactsPage} />} />
                <Route
                    path   = {ROUTES.PROFILE}
                    element = {<PrivateRoute layout={AuthLayout} component={ProfilePage} />} />
                <Route
                    path   = {ROUTES.ABOUT}
                    element = {<PrivateRoute layout={AuthLayout} component={AboutPage} />} />
                <Route
                    path   = {ROUTES.ONLINE_USERS}
                    element = {<PrivateRoute layout={AuthLayout} component={OnlineUsersPage} />} />
                <Route
                    path   = {ROUTES.JOBS}
                    element = {<PrivateRoute layout={AuthLayout} component={JobsPage} />} />
                <Route
                    path    = '*'
                    element = {<Navigate to={ROUTES.HOME} replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
