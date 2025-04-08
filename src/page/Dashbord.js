import { useEffect } from "react";
import './dash.css';
import { useLocation, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); //to authoticate user convert string to object we use json.parse
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const publicRoutes = ["/registration", "/login"];
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [token, navigate, location]);

  const handleLogout = () => {
    console.log("handlelogout");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="nav">
        {!token ? (
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/registration">Registration</a></li>
          </ul>
        ) : (
          <>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/product">Product</a></li>
              <li><a href="/productlist">Product List</a></li>
            </ul>
            <ul>
              <button onClick={handleLogout}>
                Logout {user?.firstName ? `(${user.firstName})` : ""}
              </button>
            </ul>
          </>
        )}
      </nav>
    </>
  );
}
