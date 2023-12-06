import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext/AuthProvider';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(authContext);

    const location = useLocation();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;