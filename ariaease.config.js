export default {
  audit: {
    urls: [
      'http://localhost:5173/',

      'http://localhost:5173/component-testing',
      'http://localhost:5173/static-audit',
      
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

      'http://localhost:5173/philosophy/utilities',
      'http://localhost:5173/philosophy/contracts',

      'http://localhost:5173/changelog',

      'http://localhost:5173/contract/dsl',
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
      { name: "tabs", strictness: "strict" },
      {
        name: "combobox.listbox",
        strictness: "strict",
        path: "./tests/external-contracts/combobox.listbox.contract.json",
        strategyPath: "./tests/external-strategies/CustomComboboxStrategy.js"
      }
    ]
  },
  contracts: [
    {
      src: "./tests/external-contracts/**/*.contract.mjs",
      // Optional: out: "./tests/external-contracts/generated"
      // If omitted, JSON files are written alongside the DSL sources
    },
    // Add more contract sources here
    // {
    //   src: "./another-path/**/*.contract.mjs",
    //   out: "./some-output-dir"
    // }
  ]
};