class Classes {
    constructor({
      cssId = null,
      cssClassName,
      cssCreatedAt = new Date()
    }) {
      this.cssId = cssId;
      this.cssClassName = cssClassName;
      this.cssCreatedAt = cssCreatedAt;
    }
  }
  
module.exports = Classes;