import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./screens/Header";
import Auth from "./screens/Auth";
import UserBlogs from "./screens/UserBlogs";
import Blogs from "./screens/Blogs";
import AddBlog from "./screens/AddBlog";
import BlogDetail from "./screens/BlogDetail";

function App() {
  function ProtectedRoute() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();
  
    React.useEffect(() => {
      if (!token) {
        navigate("/auth", { replace: true, state: { from: location } });
      }
    }, [token, navigate, location]);
  
    return token ? <Outlet /> : null;
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/blogs" element={<ProtectedRoute />}>
          <Route index element={<Blogs />} />
          <Route path="add" element={<AddBlog />} />
        </Route>
        <Route path="/myblogs" element={<ProtectedRoute />}>
          <Route index element={<UserBlogs />} />
          <Route path=":id" element={<BlogDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
