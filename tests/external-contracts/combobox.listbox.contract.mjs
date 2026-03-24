import { createContract } from "aria-ease/contract";

export const comboboxListboxContract = createContract("combobox.listbox", (c) => {
  c.meta({
    id: "docs.custom.contract.combobox.listbox",
    version: "1.0.0",
    created: "11-02-2026",
    lastUpdated: "19-03-2026",
    description: "Simple fluent DSL example for combobox listbox custom policy",
    source: {
      apg: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
      wcag: ["2.2 AA"],
    },
    W3CName: "Combobox Listbox Popup",
  });

  c.selectors({
    input: "[role=combobox]",
    button: "button[tabindex='-1']",
    listbox: "[role=listbox]",
    options: "[role=option]",
    focusable: "[role=combobox]",
    relative: "[role=option]",
    popup: "[role=listbox]",
  });

  c.relationships((r) => {
    r.ariaReference("input", "aria-controls", "listbox").required();
    r.contains("listbox", "options").required();
  });

  c.static((s) => {
    s.target("input").has("role", "combobox").required();
    s.target("input").has("aria-expanded", "true | false").required();
    s.target("input").has("aria-controls", "!empty").required();
  });

  c.when("Escape")
  .as("keypress")
  .on("input")
  .given("listbox.open")
  .then("listbox.closed")
  .describe("Escape closes an open listbox.")
  .required();


  c.when("ArrowDown")
  .as("keypress")
  .on("input")
  .given("listbox.closed")
  .then("listbox.open")
  .describe("Down Arrow on closed combobox opens the listbox.")
  .required();

  c.when("ArrowDown")
  .as("keypress")
  .on("input")
  .given("listbox.open")
  .then(["activeOption.first", "input.focused"])
  .describe("Second Down Arrow on open combobox makes the first option active.")
  .required();

  c.when("Home")
  .as("keypress")
  .on("input")
  .given("activeOption.last")
  .then("activeOption.first")
  .describe("Home on last option moves active option from last to first while maintaining input focus.")
  .optional();

  c.when("Click")
  .as("click")
  .on("button")
  .given("listbox.closed")
  .then("listbox.open")
  .describe("Click on the button opens the listbox.")
  .required();

  c.when("Click")
  .as("click")
  .on("button")
  .given("listbox.open")
  .then("listbox.closed")
  .describe("Click on the button closes the listbox.")
  .required();
});