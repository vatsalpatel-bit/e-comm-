import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="Nav-ul">
      {auth?
      <ul>
        <li><Link to="/Add">Products List</Link></li>
        <li><Link to="/">Add Products</Link></li>
        {/* <li><Link to="/update">Update Products</Link></li> */}
        <li><Link to="/profile">Profile</Link></li>
        <li> <Link onClick={logout} to="/signup">Logout</Link></li></ul>
        :
        <ul>
    
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>}
    </div>
  );
};

export default Nav;
