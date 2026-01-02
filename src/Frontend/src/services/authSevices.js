
export const refreshToken = async () => {
  const res = await fetch("http://localhost:3000/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } else {
    return null;
  }
};

export const initAuth = async () => {
  let token = localStorage.getItem("accessToken");

  // nếu chưa có token nhưng có refreshToken => xin token mới
  if (!token) {
    const newToken = await refreshToken();

    if (newToken) {
      localStorage.setItem("accessToken", newToken);
      return true;
    }

    return false;
  }

  return true;
}