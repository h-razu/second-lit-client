import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext/AuthProvider';
import useAccountType from '../../Hooks/useUserType/useUserType';
import Header from '../../Pages/Shared/Header/Header';

const DashboardLayout = () => {

    const { user } = useContext(authContext);
    const [accountType] = useAccountType(user?.email);

    return (
        <div>
            <Header></Header>

            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content  bg-[#F1F5F9] p-12">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 text-base-content">

                        <li>
                            <Link to="/dashboard" className='text-xl font-semibold'>
                                Dashboard
                            </Link>
                        </li>
                        {/* for admin  */}
                        {
                            accountType === "Admin" &&
                            <React.Fragment>
                                <li>
                                    <Link to="/dashboard/allSeller" className='text-xl font-semibold'>
                                        All Sellers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/allBuyers" className='text-xl font-semibold'>
                                        All Buyers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/reportedItems" className='text-xl font-semibold'>
                                        Reported Items
                                    </Link>
                                </li>
                            </React.Fragment>
                        }
                        {/* for seller  */}
                        {
                            accountType === "Seller" &&
                            <React.Fragment>
                                <li>
                                    <Link to="/dashboard/addProduct" className='text-xl font-semibold'>
                                        Add Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/myProducts" className='text-xl font-semibold'>
                                        My Products
                                    </Link>
                                </li>
                            </React.Fragment>
                        }
                        {/* for buyer  */}
                        {
                            accountType === "Buyer" &&
                            <React.Fragment>
                                <li>
                                    <Link to="/dashboard/myOrders" className='text-xl font-semibold'>
                                        My Orders
                                    </Link>
                                </li>
                            </React.Fragment>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;