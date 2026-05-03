export default {
  audit: {
    urls: [
      'http://localhost:5173/',
      'http://localhost:5173/api',
      'http://localhost:5173/getting-started',
      'http://localhost:5173/glossary',


      'http://localhost:5173/testing/component-testing',
      'http://localhost:5173/testing/static-audit',
      
      
      'http://localhost:5173/components/accordion',
      'http://localhost:5173/components/block',
      'http://localhost:5173/components/checkbox',
      'http://localhost:5173/components/combobox',
      'http://localhost:5173/components/menu',
      'http://localhost:5173/components/radio',
      'http://localhost:5173/components/tabs',
      'http://localhost:5173/components/toggle-button',
      'http://localhost:5173/components/overview',


      'http://localhost:5173/contracts/overview',
      'http://localhost:5173/contracts/checkbox',
      'http://localhost:5173/contracts/combobox',
      'http://localhost:5173/contracts/menu',
      'http://localhost:5173/contracts/radio',
      'http://localhost:5173/contracts/tabs',
      'http://localhost:5173/contracts/toggle',
      'http://localhost:5173/contracts/dsl',
      

      'http://localhost:5173/changelog',
    ],
    output: {
      format: 'all',
      out: './accessibility-reports/audit'
    }
  }
};