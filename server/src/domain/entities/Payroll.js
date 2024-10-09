class Payroll {
    constructor({
      prlId = null,
      prlUsrId,
      prlNominal,
      prlPayrollStatus,
      prlCreatedBy,
      prlCreatedAt = new Date()
    }) {
      this.prlId = prlId;
      this.prlUsrId = prlUsrId;
      this.prlNominal = prlNominal;
      this.prlPayrollStatus = prlPayrollStatus;
      this.prlCreatedBy = prlCreatedBy;
      this.prlCreatedAt = prlCreatedAt;
    }
  }
  
module.exports = Payroll;