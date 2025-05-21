import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-center">Error 404</h2>
            <p className="text-3xl font-bold text-center">Page not found</p>
            <Link to="/" className="text-3xl bg-cyan-300 rounded-4xl font-bold text-center">Go Home</Link>

        </div>
    );
};

export default ErrorPage;