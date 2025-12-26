export const getUserProfile = async (req, res) => {
    try {
        const user = req.user; // có từ middleware

        return res.status(200).json({
            id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
        });

    } catch (error) {
        console.log("PROFILE ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};
