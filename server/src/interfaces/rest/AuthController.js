const sequelizeDatabase = require('../../config/Database');

class AuthController {
    async Login(req, res) {
        try {
            const [user] = await sequelizeDatabase.getConnection().query(
                "SELECT * FROM users.user WHERE usr_username = :username",
                {
                    replacements: { username: req.body.usrUsername },
                    type: sequelizeDatabase.getConnection().QueryTypes.SELECT, // Use the QueryTypes correctly
                }
            );

            if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

            if (user.usr_password !== req.body.usrPassword) {
                return res.status(400).json({ msg: "Wrong Password" });
            }

            req.session.usrId = user.usrId;
            const usrId = user.usrId;
            const usrFullName = user.usrFullName;
            const usrRole = user.usrRole;
            res.status(200).json({usrId, usrFullName, usrRole});
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
            const user = await this.userRepository.findOne({
                attributes: ['usrId', 'usrFullName', 'usrUsername', 'usrRoleId'],
                where: { usrId: req.session.usrId }
            });

            if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

            res.status(200).json(user);
        } catch (error) {
            console.error("Me endpoint error:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    logOut(req, res) {
        req.session.destroy((err) => {
            if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
            res.status(200).json({ msg: "Anda telah logout" });
        });
    }
}

module.exports = AuthController;
