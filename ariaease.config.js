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
      'http://localhost:5173/contracts/combobox',
      'http://localhost:5173/contracts/dsl',
      

      'http://localhost:5173/changelog',
    ],
    output: {
      format: 'all',
      out: './accessibility-reports/audit'
    }
  },
  test: {
    strictness: "balanced", // fallback: minimal | balanced | strict | paranoid
    components: [
      { name: "menu", strictness: "strict", contractPath: "./tests/external-contracts/menu.contract.json" },
      { name: "accordion", strictness: "minimal", contractPath: "./tests/external-contracts/aria-contracts/accordion/accordion.contract.json" },
      { name: "tabs", strictness: "strict", contractPath: "./tests/external-contracts/aria-contracts/tabs/tabs.contract.json" },
      {
        name: "combobox",
        strictness: "strict",
        contractPath: "./tests/external-contracts/combobox.listbox.contract.json",
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