import React, { useContext} from "react";
import { AuthContext } from "../Authentication/Authentication";
import { useNavigate } from "react-router-dom";
//bootstrap

// import { Navigate } from 'react-router-dom';
function Navbar() {
  const Navigate = useNavigate();
  const auth = useContext(AuthContext);
  // useEffect(() => {
  //     console.log(auth);
  // }, [auth]);

  const handleLogout = () => {
    auth[0].logOut();
    // window.location.href = "/login";
    Navigate("/login");
  };
  const handleLogin = () => {
    // window.location.href = "/login";
    Navigate("/login");
  };
  return (
    <div className="navbar d-flex flex-nowrap justify-content-between align-items-center position-fixed top-0 z-3 w-100 px-4">
      <h4 className="m-0">NavBar</h4>
      <div className="d-flex justify-content-between align-items-center w-25 "
      style={{
        fontSize: '1rem',
        maxWidth: '150px',
      }}>
        <li>{auth && auth[0]?.user?.username}</li>
        {auth && auth[0]?.user ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li onClick={handleLogin}>Login</li>
        )}
      </div>
    </div>
  );
}

export default Navbar;
