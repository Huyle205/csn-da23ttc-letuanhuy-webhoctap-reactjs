export const apiClient = async (url, options = {}) => {
    let token = localStorage.getItem("accessToken");

    // Chỉ set Content-Type nếu không phải FormData
    const headers = {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
    };

    // Nếu body không phải FormData thì mới set Content-Type: application/json
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    let res = await fetch(url, {
        ...options,
        headers,
        credentials: "include"
    });

    // Nếu access token hết hạn → gọi refresh
    if(res.status === 403){
        const ref = await fetch("http://localhost:3000/api/auth/refresh", {
            method: "POST",
            credentials: "include"
        });

        const data = await ref.json();
        if(ref.ok){
            localStorage.setItem("accessToken", data.accessToken);

            // Gọi lại request cũ
            token = data.accessToken;
            
            const retryHeaders = {
                Authorization: `Bearer ${token}`,
                ...(options.headers || {})
            };
            
            if (!(options.body instanceof FormData)) {
                retryHeaders["Content-Type"] = "application/json";
            }
            
            res = await fetch(url,{
                ...options,
                headers: retryHeaders,
                credentials:"include"
            });
        } else {
            throw new Error("Token expired, require login")
        }
    }

    return res.json();
}
