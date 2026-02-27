export default {
  audit: {
    urls: [
      'http://localhost:5173/',

      'http://localhost:5173/testing',
      'http://localhost:5173/audit',
      
      'http://localhost:5173/api',
      'http://localhost:5173/docs',
      'http://localhost:5173/migration',
      'http://localhost:5173/examples',

      'http://localhost:5173/examples/accordion',
      'http://localhost:5173/examples/block',
      'http://localhost:5173/examples/checkbox',
      'http://localhost:5173/examples/combobox',
      'http://localhost:5173/examples/menu',
      'http://localhost:5173/examples/radio',
      'http://localhost:5173/examples/toggle-button',

      'http://localhost:5173/changelog'
    ],
    output: {
      format: 'html',
      out: './accessibility-reports/audit'
    }
  }
};