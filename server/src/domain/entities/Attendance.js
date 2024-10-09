class Attendance {
    constructor({
      attId = null,
      attAptId,
      attCheckIn = null,
      attCheckOut = null,
      attCreatedBy,
      attCreatedAt = new Date()
    }) {
      this.attId = attId;
      this.attAptId = attAptId;
      this.attCheckIn = attCheckIn;
      this.attCheckOut = attCheckOut;
      this.attCreatedBy = attCreatedBy;
      this.attCreatedAt = attCreatedAt;
    }
  }
  
module.exports = Attendance;