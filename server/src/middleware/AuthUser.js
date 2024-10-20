const SequelizeUserRepository = require('../interface_adapters/repositories/SequelizeUserRepository');

// Instantiate the repository class
const userRepository = new SequelizeUserRepository();

export const verifyUser = async (req, res, next) => {
    try {
        if (!req.session.usrId) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }

        const user = await userRepository.findOne({
            where: { usrId: req.session.usrId }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        req.usrId = user.usrId;
        req.usrRoleId = user.usrRoleId; 
        next();
    } catch (error) {
        console.error("verifyUser error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const adminOnly = async (req, res, next) => {
    try {
        const user = await userRepository.findOne({
            where: { usrId: req.session.usrId }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        // Assuming `usrRoleId` determines access levels
        if (user.usrRoleId !== 1 && user.usrRoleId !== 2) {
            return res.status(403).json({ msg: "Akses terlarang" });
        }

        next();
    } catch (error) {
        console.error("adminOnly error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
