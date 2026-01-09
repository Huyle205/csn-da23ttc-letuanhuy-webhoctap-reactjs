import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

export default function PrivateRoute({ children, allowedRoles = ['student'] }) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  const user = getUserFromToken();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Nếu có định nghĩa allowedRoles, kiểm tra role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect về trang phù hợp với role
    if (user.role === 'teacher') {
      return <Navigate to="/teacher" replace />;
    }
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}