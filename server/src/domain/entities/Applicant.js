class Applicant {
    constructor({
      aplId = null,
      aplName,
      aplNim,
      aplEmail,
      aplProdi,
      aplAkt,
      aplCrsId,
      aplSuratLamaran,
      aplCv,
      aplKhs,
      aplCreatedAt = new Date()
    }) {
      this.aplId = aplId;
      this.aplName = aplName;
      this.aplNim = aplNim;
      this.aplEmail = aplEmail;
      this.aplProdi = aplProdi;
      this.aplAkt = aplAkt;
      this.aplCrsId = aplCrsId;
      this.aplSuratLamaran = aplSuratLamaran;
      this.aplCv = aplCv;
      this.aplKhs = aplKhs;
      this.aplCreatedAt = aplCreatedAt;
    }
  }
  
module.exports = Applicant;