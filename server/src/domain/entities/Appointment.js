class Appointment {
    constructor({
      aptId = null,
      aptUsrId,
      aptCcId,
      aptCreatedAt = new Date()
    }) {
      this.aptId = aptId;
      this.aptUsrId = aptUsrId;
      this.aptCcId = aptCcId;
      this.aptCreatedAt = aptCreatedAt;
    }
  }
  
module.exports = Appointment;