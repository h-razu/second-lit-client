import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext/AuthProvider';
import useAccountType from '../../Hooks/useUserType/useUserType';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(authContext);
    const [accountType, isUserLoading] = useAccountType(user?.email);
    const location = useLocation();

    if (loading || isUserLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user) {

        if (accountType === "Admin") {
            return children
        }
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;