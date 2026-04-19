import { createContract } from "aria-ease/contract";

export const tabsContract = createContract("tabs", (c) => {
  c.meta({
    id: "docs.custom.contract.tabs",
    version: "1.0.0",
    created: "11-02-2026",
    lastUpdated: "19-03-2026",
    description: "Simple fluent DSL example for tabs custom policy",
    source: {
      apg: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
      wcag: ["2.2 AA"],
    },
    W3CName: "Tabs",
  });

  c.selectors({
    main: "[role=tablist]",
    tablist: "[role=tablist]",
    tab: "[role=tab]",
    panel: "[role=tabpanel]",
    focusable: "[role=tab]",
    relative: "[role=tab]"
  });

  c.relationships((r) => {
    r.contains("tablist", "tab").required();
    r.ariaReference("tab", "aria-controls", "panel").required();
  });

  c.static((s) => {
    s.target("tablist").has("role", "tablist").required();
    s.target("tab").has("role", "tab").required();
    s.target("panel").has("role", "tabpanel").required();
  });
  
  // Arrow Right
  c.when("ArrowRight")
  .as("keypress")
  .on("relative", 1)
  .given({ type: "focusedTab", ref: "first" })
  .then({ type: "focusedTab", ref: 2 })
  .describe("Arrow Right moves focus to the second tab.")
  .required();

  // Arrow Left
  c.when("ArrowLeft")
  .as("keypress")
  .on("relative", "second")
  .given({ type: "focusedTab", ref: "second" })
  .then({ type: "focusedTab", ref: "first" })
  .describe("Arrow Left moves focus to the first tab.")
  .required();

});