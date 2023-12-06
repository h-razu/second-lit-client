import React from 'react';
import useTitle from '../../../Hooks/useTitle/useTitle';

const Dashboard = () => {
    useTitle("Dashboard");
    return (
        <div>
            <h1 className='text-primary text-3xl text-center font-bold'>This Is Default Dashboard for all</h1>
        </div>
    );
};

export default Dashboard;