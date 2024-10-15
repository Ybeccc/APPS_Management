const { response } = require('express');
const SequelizeUserRepository = require('../../interface_adapters/repositories/SequelizeUserRepository');

class AuthController {
    constructor() {
        this.userRepository = new SequelizeUserRepository();
    }

    async Login(req, res) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    usrUsername: req.body.usrUsername
                }
            });

            if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

            if (user.usrPassword !== req.body.usrPassword) {
                return res.status(400).json({ msg: "Wrong Password" });
            }

            req.session.usrId = user.usrId;
            const { usrId, usrFullName, usrUsername, usrRoleId } = user;
            res.status(200).json({ usrId, usrFullName, usrUsername, usrRoleId });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }

    async Me(req, res) {
        if (!req.session.usrId) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }
        const user = await this.userRepository.findOne({
            attributes: ['usrId', 'usrFullName', 'usrUsername', 'usrRoleId'],
            where: {
                usrId: req.session.usrId
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        res.status(200).json(user);
    }

    logOut(req, res) {
        req.session.destroy((err) => {
            if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
            res.status(200).json({ msg: "Anda telah logout" });
        });
    }
}

module.exports = AuthController;