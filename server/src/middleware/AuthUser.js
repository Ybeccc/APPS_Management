const SequelizeUserRepository = require('../interface_adapters/repositories/SequelizeUserRepository');

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await SequelizeUserRepository.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}

export const adminOnly = async (req, res, next) =>{
    const user = await SequelizeUserRepository.findOne({
        where: {
            usrId: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if (user.role !== 1 && user.role !== 2) {
        return res.status(403).json({ msg: "Akses terlarang" });
    }    
    next();
}