import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate dữ liệu
  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validate()) return;

  //   const res = await fetch("http://localhost:3000/api/auth/signin", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include", // để cookie refreshToken hoạt động
  //     body: JSON.stringify(form),
  //   });

  //   const data = await res.json();

  //   if (res.ok) {
  //     localStorage.setItem("accessToken", data.accessToken);

  //     window.location.href = "/";
  //   } else {
  //     alert(data.message || "Đăng nhập thất bại!");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Đăng nhập thành công!");
      //  lưu token
      localStorage.setItem("accessToken", data.accessToken);

      //  lưu user (CỰC QUAN TRỌNG)
      localStorage.setItem("user", JSON.stringify(data.user));

      //  điều hướng theo role
      if (data.user.role === "teacher") {
        window.location.href = "/teacher";
      } else if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
      
    } else {
      toast.error("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-xl w-[400px]" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-2">Đăng nhập TVULEARN</h2>
        <p className="mb-5 text-center text-gray-500 font-semibold">
          Chào mừng quay trở lại!
        </p>

        {/* Email */}
        <label className="mb-2 block font-semibold" htmlFor="email">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="w-full py-2 px-4 border-[1px] opacity-50 rounded-4xl mb-3"
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        {/* Password */}
        <label className="mb-2 block font-semibold" htmlFor="password">
          Mật khẩu
        </label>
        <input
          name="password"
          type="password"
          className="w-full py-2 px-4 border-[1px] opacity-50 rounded-4xl mb-3"
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        {/* Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-4xl hover:bg-blue-600 mt-3 font-semibold cursor-pointer">
          Đăng nhập
        </button>

        {/* Chuyển trang */}
        <p className="mt-3 text-center">
          Chưa có tài khoản? <Link to="/signup" className="text-blue-600">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
}
