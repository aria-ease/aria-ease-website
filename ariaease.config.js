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

      'http://localhost:5173/utilities/accordion',
      'http://localhost:5173/utilities/block',
      'http://localhost:5173/utilities/checkbox',
      'http://localhost:5173/utilities/combobox',
      'http://localhost:5173/utilities/menu',
      'http://localhost:5173/utilities/radio',
      'http://localhost:5173/utilities/tabs',
      'http://localhost:5173/utilities/toggle-button',

      'http://localhost:5173/changelog'
    ],
    output: {
      format: 'all',
      out: './accessibility-reports/audit'
    }
  },
  test: {
    strictness: "balanced", // fallback: minimal | balanced | strict | paranoid
    components: [
      { name: "menu", strictness: "strict" },
      { name: "accordion", strictness: "minimal" },
      { name: "tabs", strictness: "strict" }
    ]
  }
};