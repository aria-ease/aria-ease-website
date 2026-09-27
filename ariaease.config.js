export default {
  audit: {
    urls: [
      "https://www.milfordpulmonary.com",

      "https://www.milfordpulmonary.com/who-we-are",

      "https://www.milfordpulmonary.com/services",

      "https://www.milfordpulmonary.com/new-patient-information",

      "https://www.milfordpulmonary.com/patient-resources",

      "https://www.milfordpulmonary.com/request-an-appointment",

      "https://www.milfordpulmonary.com/dr-michel-samaha-m-d",

      "https://www.milfordpulmonary.com/privacy-policy",

      "https://www.milfordpulmonary.com/accessibility-statement"    
    ],
    output: {
      format: 'all',
      out: './accessibility-reports/audit'
    },
    
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  }
};