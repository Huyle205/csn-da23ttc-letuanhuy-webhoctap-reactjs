import { useState } from "react";
import { Link } from "react-router";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({}); // chứa lỗi
  // để theo dõi trạng thái đang tải (loading)
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate dữ liệu
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Tên không được để trống";
    } else if (form.name.length < 3) {
      newErrors.name = "Tên phải ít nhất 3 ký tự";
    }

    // validate email bằng regex
    if (!form.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự trở lên";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // hợp lệ nếu không có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // nếu validate fail → dừng

    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

    const data = await res.json();

    if (res.ok) {
      alert("Đăng ký thành công! Chuyển sang trang đăng nhập.");
      window.location.href = "/signin";
    } else {
      alert(data.message || "Đăng ký thất bại!");
    }
  } catch (error) {
      console.error("Error during signup:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-xl w-[400px]" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-2">Tạo tài khoản TVULEARN</h2>
        <p className="mb-5 text-center text-gray-500 font-semibold">Chào mừng bạn! Hãy đăng ký để bắt đầu! </p>
        <label className = "mb-2 block font-semibold" htmlFor="name">Tên người dùng</label>
        <input
          name="name"
          type="text"
          className="w-full py-2 px-4 border-[1px] opacity-50 rounded-4xl mb-3"
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
        <label className = "mb-2 block font-semibold" htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          className="w-full py-2 px-4 border-[1px] opacity-50 rounded-4xl mb-3"
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
        <label className = "mb-2 block font-semibold" htmlFor="password">Mật khẩu</label>
        <input
          name="password"
          type="password"
          className="w-full py-2 px-4 border-[1px] opacity-50 rounded-4xl mb-3"
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        <button className="w-full bg-blue-500 text-white py-2 rounded-4xl hover:bg-blue-600 mt-3 font-semibold cursor-pointer "  disabled={isLoading}  >
          {isLoading ? "Đang xử lý..." : "Đăng ký"}
        </button>
        <p className="mt-3 text-center">
          Đã có tài khoản? <Link to="/Signin" className="text-blue-600">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}
