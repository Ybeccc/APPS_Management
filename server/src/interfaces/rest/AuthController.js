const sequelizeDatabase = require('../../config/Database');
const SequelizeUserRepository = require('../../interface_adapters/repositories/SequelizeUserRepository');
const GetUserUseCase = require('../../application/usecases/GetUserUseCase');

class AuthController {
    constructor() {
        this.userRepository = new SequelizeUserRepository();
        this.getUserUseCase = new GetUserUseCase(this.userRepository);
    }

    async Login(req, res) {
        try {
            const [user] = await sequelizeDatabase.getConnection().query(
                "SELECT * FROM users.user WHERE usr_username = :username",
                {
                    replacements: { username: req.body.usrUsername },
                    type: sequelizeDatabase.getConnection().QueryTypes.SELECT,
                }
            );
    
            if (!user) return res.status(404).json({ msg: "User not found" });
            if (user.usr_password !== req.body.usrPassword) {
                return res.status(400).json({ msg: "Wrong Password" });
            }
    
            req.session.usrId = user.usr_id; // Set the session
            console.log("Session set at login with sessionID:", req.sessionID);
    
            res.status(200).json({
                usrId: user.usr_id,
                usrFullName: user.usr_fullName,
                usrRole: user.usr_role,
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }
    
    
    async Me(req, res) {
        console.log("Session ID in Me endpoint:", req.sessionID); // Log session ID in Me endpoint
        console.log("Session details:", req.session); // Log the entire session object for clarity
    
        if (!req.session.usrId) {
            console.log("Session ID not found. User is not logged in.");
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }
    
        try {
            const user = await this.getUserUseCase.findById(req.session.usrId);
    
            if (!user) {
                console.log("User not found for session ID:", req.session.usrId);
                return res.status(404).json({ msg: "User tidak ditemukan" });
            }
    
            res.status(200).json(user);
        } catch (error) {
            console.error("Me endpoint error:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }
      

    async logOut(req, res) {
        req.session.destroy((err) => {
            if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
            res.status(200).json({ msg: "Anda telah logout" });
        });
    }
}

module.exports = AuthController;
