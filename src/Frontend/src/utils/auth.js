
export const logout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/signout", {
      method: "POST",
      credentials: "include"  // QUAN TRỌNG: để gửi cookie refresh token
    });

    if (res.ok) {
      localStorage.removeItem("accessToken");
      return true;
    }
    return false;

  } catch (error) {
    console.log("Logout error:", error);
    return false;
  }
};

export const getUserFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
            user_id: payload.user_id,
            username: payload.username,
            email: payload.email,
            role: payload.role
        };
    } catch (err) {
        return null;
    }
};

export const getUserRole = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.role;
    } catch (err) {
        return null;
    }
};