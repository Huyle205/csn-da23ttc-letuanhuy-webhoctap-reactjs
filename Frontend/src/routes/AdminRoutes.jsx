import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminCourses from "../pages/admin/AdminCourses";
import AdminAddTeacher from "../pages/admin/AdminAddTeacher";
//import RequireRole from "./RequireRole";

const AdminRoutes = () => {
    return (
       // <RequireRole role="admin">
            <AdminLayout>
                <Routes>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/teachers/create" element={<AdminAddTeacher />} />
                </Routes>
            </AdminLayout>
        //</RequireRole>
    );
};

export default AdminRoutes;
