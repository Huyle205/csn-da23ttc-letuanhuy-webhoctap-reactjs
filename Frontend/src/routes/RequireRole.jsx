import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const RequireRole = ({ role, children }) => {
    const user = getUserFromToken();

    if (!user) return <Navigate to="/signin" />;

    if (user.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RequireRole;
