import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const TeacherRoute = ({ children }) => {
    const user = getUserFromToken();

    if (!user) return <Navigate to="/signin" />;
    
    if (user.role !== "teacher") {
        // Redirect về trang phù hợp với role
        if (user.role === 'admin') {
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/" />;
    }

    return children;
};

export default TeacherRoute;
