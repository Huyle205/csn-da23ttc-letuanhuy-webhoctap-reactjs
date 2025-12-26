const Footer = () => {
    const quickLinks = [
        { label: "Trang chủ", href: "/" },
        { label: "Lộ trình", href: "/roadmap" },
        { label: "Khóa học", href: "/courses" },
        { label: "Khóa học của tôi", href: "/my-courses" },
        { label: "Đăng nhập", href: "/signin" },
    ];

    const resourceLinks = [
        { label: "Thông báo", href: "/news" },
        { label: "Sự kiện", href: "/events" },
        { label: "Hỗ trợ học tập", href: "/support" },
    ];

    const socials = [
        { label: "Facebook", icon: "/facebook.png", href: "https://facebook.com" },
        { label: "YouTube", icon: "/youtube.png", href: "https://youtube.com" },
        { label: "Website", icon: "/web.png", href: "https://tvu.edu.vn" },
    ];

    return (
        <footer className="bg-[#360185] text-white mt-12 border-t border-white/10 z-20 block">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Khoa Công Nghệ Thông Tin</h2>
                        <ul className="text-sm space-y-1 text-white/80">
                            <li>126 Nguyễn Thiện Thành, Phường 5, TP Trà Vinh</li>
                            <li>Điện thoại: (+84).2943.855.246</li>
                            <li>Fax: (+84).2943.855.217</li>
                            <li>Email: <a className="hover:text-white" href="mailto:tvu@tvu.edu.vn">tvu@tvu.edu.vn</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-3 text-sm text-white/80">
                            {quickLinks.map((item) => (
                                <li key={item.label}>
                                    <a className="transition-colors hover:text-white" href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Tài nguyên</h3>
                            <ul className="space-y-3 text-sm text-white/80">
                                {resourceLinks.map((item) => (
                                    <li key={item.label}>
                                        <a className="transition-colors hover:text-white" href={item.href}>{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row md:items-center justify-center">
                    <p>© {new Date().getFullYear()} TVU CNTT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
