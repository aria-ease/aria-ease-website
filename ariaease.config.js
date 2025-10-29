export default {
  audit: {
    urls: [
      'http://localhost:5173/changelog',
    ],
    output: {
      format: 'html',
      out: './accessibility-reports/audit'
    }
  }
};