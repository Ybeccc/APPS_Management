const SequelizeUserRepository = require('../../interface_adapters/repositories/SequelizeUserRepository');
const argon2 = require('argon2');

class AuthController {
    async Login(req, res) {
        const user = await SequelizeUserRepository.findOne({
            where: {
                usrUsername: req.body.usrUsername
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
        const match = await argon2.verify(user.usrPassword, req.body.usrPassword);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        req.session.usrId = user.usrId;
        const { usrId, usrFullName, usrUsername, usrRoleId } = user;
        res.status(200).json({ usrId, usrFullName, usrUsername, usrRoleId });
    }

    async Me(req, res) {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }
        const user = await SequelizeUserRepository.findOne({
            attributes: ['usrId', 'fullname', 'username', 'role'],
            where: {
                usrId: req.session.userId
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