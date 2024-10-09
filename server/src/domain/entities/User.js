class User {
    constructor({
      usrId = null,
      usrRoleId,
      usrFullName,
      usrUsername,
      usrPassword,
      usrNim = null,
      usrBankAccount = null,
      usrBankAccountNumber = null,
      usrStatus,
      usrCreatedBy,
      usrCreatedAt = new Date()
    }) {
      this.usrId = usrId;
      this.usrRoleId = usrRoleId;
      this.usrFullName = usrFullName;
      this.usrUsername = usrUsername;
      this.usrPassword = usrPassword;
      this.usrNim = usrNim;
      this.usrBankAccount = usrBankAccount;
      this.usrBankAccountNumber = usrBankAccountNumber;
      this.usrStatus = usrStatus;
      this.usrCreatedBy = usrCreatedBy;
      this.usrCreatedAt = usrCreatedAt;
    }
  }
  
module.exports = User;