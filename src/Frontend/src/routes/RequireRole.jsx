import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const RequireRole = ({ role, children }) => {
    const user = getUserFromToken();

    if (!user) return <Navigate to="/signin" />;

    if (user.role !== role) {
        // Redirect về trang phù hợp với role của user
        if (user.role === 'teacher') {
            return <Navigate to="/teacher" />;
        }
        if (user.role === 'admin') {
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/" />;
    }

    return children;
};

export default RequireRole;
