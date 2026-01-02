import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const TeacherRoute = ({ children }) => {
    const role = getUserRole();

    if (!role) return <Navigate to="/signin" />;
    if (role !== "teacher") return <Navigate to="/" />;

    return children;
};

export default TeacherRoute;
