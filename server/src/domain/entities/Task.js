class Task {
    constructor({
      tskId = null,
      tskAptId,
      tskTaskName,
      tskDescription,
      tskNotes,
      tskCreatedBy,
      tskCreatedAt = new Date()
    }) {
      this.tskId = tskId;
      this.tskAptId = tskAptId;
      this.tskTaskName = tskTaskName;
      this.tskDescription = tskDescription;
      this.tskNotes = tskNotes;
      this.tskCreatedBy = tskCreatedBy;
      this.tskCreatedAt = tskCreatedAt;
    }
  }
  
module.exports = Task;