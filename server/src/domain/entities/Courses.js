class Courses {
    constructor({
      crsId = null,
      crsCourseName,
      crsCode,
      crsCreatedAt = new Date()
    }) {
      this.crsId = crsId;
      this.crsCourseName = crsCourseName;
      this.crsCode = crsCode;
      this.crsCreatedAt = crsCreatedAt;
    }
  }
  
module.exports = Courses;