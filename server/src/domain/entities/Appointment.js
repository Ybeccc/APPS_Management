class Appointment {
    constructor({
      aptId = null,
      aptUsrId,
      aptCcId,
      aptCreatedBy,
      aptCreatedAt = new Date()
    }) {
      this.aptId = aptId;
      this.aptUsrId = aptUsrId;
      this.aptCcId = aptCcId;
      this.aptCreatedBy = aptCreatedBy;
      this.aptCreatedAt = aptCreatedAt;
    }
  }
  
module.exports = Appointment;