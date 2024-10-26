const sequelizeDatabase = require('../../config/Database');

class AuthController {
    async Login(req, res) {
        try {
            const [user] = await sequelizeDatabase.getConnection().query(
                "SELECT * FROM users.user WHERE usr_username = :username",
                {
                    replacements: { username: req.body.usrUsername },
                    type: sequelizeDatabase.getConnection().QueryTypes.SELECT,
                }
            );
            if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

            if (user.usr_password !== req.body.usrPassword) {
                return res.status(400).json({ msg: "Password salah" });
            }

            // Set session after successful login
            req.session.usrId = user.usr_id;
            const usrId = user.usr_id;
            const usrFullName = user.usr_fullname;
            const usrRoleId = user.usr_role_id;

            res.status(200).json({usrId, usrFullName, usrRoleId});
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    async Me(req, res) {
        if (!req.session.usrId) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }

        try {
            // Fetch the user data based on session user ID
            const user = await sequelizeDatabase.getConnection().query(
                "SELECT usrId, usrFullName, usrUsername, usrRoleId FROM users.user WHERE usrId = :usrId",
                {
                    replacements: { usrId: req.session.usrId },
                    type: sequelizeDatabase.getConnection().QueryTypes.SELECT,
                }
            );

            // If user is not found, return 404
            if (!user || user.length === 0) {
                return res.status(404).json({ msg: "User tidak ditemukan" });
            }

            // Return the user data
            res.status(200).json(user[0]);
        } catch (error) {
            console.error("Me endpoint error:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    // Logout method to destroy the session
    logOut(req, res) {
        req.session.destroy((err) => {
            if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
            res.status(200).json({ msg: "Anda telah logout" });
        });
    }
}

module.exports = AuthController;