class ClassCourse {
    constructor({
      ccId = null,
      ccCrsId,
      ccCssId,
      ccCreatedBy,
      ccCreatedAt = new Date()
    }) {
      this.ccId = ccId;
      this.ccCrsId = ccCrsId;
      this.ccCssId = ccCssId;
      this.ccCreatedBy = ccCreatedBy;
      this.ccCreatedAt = ccCreatedAt;
    }
  }
  
module.exports = ClassCourse;