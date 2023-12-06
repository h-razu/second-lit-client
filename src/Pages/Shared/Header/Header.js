import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../../Context/AuthContext/AuthProvider";
import avatar from "../../../assets/images/user.png";

const Header = () => {
  const activeNav = {
    color: "#009B4D",
    background: "none",
  };

  const { user, logOut } = useContext(authContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("secondLit-token");
      })
      .catch((err) => toast.error(err));
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <NavLink
          to="/"
          className="text-xl font-semibold"
          style={({ isActive }) => (isActive ? activeNav : undefined)}
        >
          Home
        </NavLink>
      </li>
      {user?.uid ? (
        <li>
          <NavLink
            to="/dashboard"
            className="text-xl font-semibold"
            style={({ isActive }) => (isActive ? activeNav : undefined)}
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            to="/login"
            className="text-xl font-semibold"
            style={({ isActive }) => (isActive ? activeNav : undefined)}
          >
            Login
          </NavLink>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg md:px-8">
      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <div className="w-full">
        <Link to="/">
          <h1 className='text-primary text-xl md:text-3xl lg:text-5xl font-bold font-["Redressed"]'>
            Second <span className="text-secondary">Lit</span>
          </h1>
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user?.uid ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-14 rounded-full ring ring-secondary">
                <img src={user?.photoURL} alt="profileImage" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-4 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-60"
            >
              <li>
                <p className="text-xl font-semibold text-secondary my-3">
                  {user?.displayName}
                </p>
              </li>

              <div className="flex flex-col lg:hidden">
                <div className="divider"></div>
                {menuItems}
                <div className="divider"></div>
              </div>

              <li>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-14 rounded-full ring ring-secondary">
                <img src={avatar} alt="profileImage" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-4 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-60"
            >
              <div className="flex flex-col lg:hidden">{menuItems}</div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
