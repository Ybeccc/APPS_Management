const UserRepository = require('../../domain/repositories/UserRepository');
const User = require('../../domain/entities/User');
const sequelizeDatabase = require('../../config/Database');
const { DataTypes } = require('sequelize');

// Define the Sequelize model for User
const UserModel = sequelizeDatabase.getConnection().define('User', {
  usrId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'usr_id'  // Maps to snake_case in the database
  },
  usrRoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'usr_role_id'
  },
  usrFullName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'usr_fullname'
  },
  usrUsername: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'usr_username'
  },
  usrPassword: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'usr_password'
  },
  usrNim: {
    type: DataTypes.STRING(9),
    allowNull: true,
    field: 'usr_nim'
  },
  usrBankAccount: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'usr_bank_account'
  },
  usrBankAccountNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'usr_bank_account_number'
  },
  usrStatus: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'usr_status'
  },
  usrCreatedBy: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'usr_created_by'
  },
  usrCreatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'usr_created_at'
  }
}, {
  tableName: 'user',
  schema: 'users',
  timestamps: false,
});

class SequelizeUserRepository extends UserRepository {
  async create(userData) {
    const createdUser = await UserModel.create(userData);
    return createdUser;
  }
  async findById(userId) {
    const user = await UserModel.findOne({
      where: {
        usr_id: userId,
      }
    });
    return user
  }
  async getAll() {
    return await UserModel.findAll();
  }
  async update(userId, userData){
    const [affectedRows] = await UserModel.update(
      userData,  
      {
        where: { usrId: userId } 
      }
    );

    if (affectedRows === 0) {
      console.log('No rows updated.');
      return null;  
    }

    const updatedUser = await UserModel.findByPk(userId);
    return updatedUser;
  }

  async Login(req, res) {
    try {
        const user = await UserModel.findOne({
            where: { usrUsername: req.body.usrUsername }
        });

        if (!user) {
            return res.status(404).json({ msg: "User tidak ditemukan" });
        }

        if (user.usrPassword !== req.body.usrPassword) {
            return res.status(400).json({ msg: "Password salah" });
        }

        // Set session after successful login
        req.session.usrId = user.usr_id;
        
        // Log session data to confirm
        console.log('Session User ID after login:', req.session.usrId);

        const { usr_id: usrId, usr_fullname: usrFullName, usr_role_id: usrRoleId } = user;

        res.status(200).json({ usrId, usrFullName, usrRoleId });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
  }


  async Me(req, res) {
    // Log session data at the beginning
    console.log('Session User ID:', req.session.usrId);

    if (!req.session.usrId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    const user = await UserModel.findOne({
        attributes: ['usrId', 'usrFullName', 'usrRoleId'],
        where: { usrId: req.session.usrId }
    });

    if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.status(200).json(user.toJSON());
  }

  async LogOut(req, res) {
      req.session.destroy((err) => {
          if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
          res.status(200).json({ msg: "Anda telah logout" });
      });
  }
}

module.exports = SequelizeUserRepository;