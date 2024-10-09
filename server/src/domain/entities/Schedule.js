class Schedule {
    constructor({
      schId = null,
      schUsrId,
      schScheduleTime = null,
      schCreatedBy,
      schCreatedAt = new Date()
    }) {
      this.schId = schId;
      this.schUsrId = schUsrId;
      this.schScheduleTime = schScheduleTime;
      this.schCreatedBy = schCreatedBy;
      this.schCreatedAt = schCreatedAt;
    }
  }
  
module.exports = Schedule;