import { createContract } from "aria-ease/contract";

export const comboboxListboxContract = createContract("combobox", (c) => {
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
    W3CName: "Combobox With Listbox Popup",
  });

  c.selectors({
    main: "[role=combobox]",
    input: "[role=combobox]",
    button: "button[tabindex='-1']",
    options: "[role=option]",
    relative: "[role=option]",
    popup: "[role=listbox]",
  });

  c.relationships((r) => {
    r.ariaReference("main", "aria-controls", "popup").required();
    r.contains("popup", "options").required();
  });

  c.static((s) => {
    s.target("main").has("role", "combobox").required();
    s.target("main").has("aria-expanded", "false").required();
    s.target("main").has("aria-controls", "!empty").required();
    s.target("main").has("aria-autocomplete", "list").recommended();
    s.target("main").has("aria-haspopup", "listbox").required();
    s.target("options").has("aria-selected", "false").required();
  });


  // Escape
  c.when("Escape")
  .as("keypress")
  .on("main")
  .given("comboboxpopup.open")
  .then("comboboxpopup.closed")
  .describe("Escape closes an open listbox popup.")
  .required();

  c.when("Escape")
  .as("keypress")
  .on("main")
  .given(["comboboxpopup.closed", "input.filled"])
  .then("input.empty")
  .describe("Escape clears input when listbox popup is closed.")
  .required();

  //Arrow Down
  c.when("ArrowDown")
  .as("keypress")
  .on("input")
  .given("comboboxpopup.closed")
  .then("comboboxpopup.open")
  .describe("Down Arrow on closed combobox opens the listbox popup.")
  .required();

  c.when("ArrowDown")
  .as("keypress")
  .on("input")
  .given("comboboxpopup.open")
  .then(["main.focused", {type: "option.active", ref: "first"}])
  .describe("Second Down Arrow on open combobox makes the first option active.")
  .required();


  //Home
  c.when("Home")
  .as("keypress")
  .on("relative", "last")
  .given({type: "option.active", ref: "last"})
  .then({type: "option.active", ref: "first"})
  .describe("Home on last option moves active option from last to first while maintaining input focus.")
  .optional();


  //Click
  c.when("Click")
  .as("click")
  .on("button")
  .given("comboboxpopup.closed")
  .then("comboboxpopup.open")
  .describe("Click on the button opens the listbox popup.")
  .required();

  c.when("Click")
  .as("click")
  .on("button")
  .given("comboboxpopup.open")
  .then("comboboxpopup.closed")
  .describe("Click on the button closes the listbox popup.")
  .required();

  c.when("Click")
  .as("click")
  .on("options")
  .given("comboboxpopup.open")
  .then({type: "option.selected", ref: "first"})
  .describe("Click on option selects it and closes listbox popup.")
  .required();

  c.when("Click")
  .as("click")
  .on("options")
  .given("comboboxpopup.open")
  .then({type: "option.selected", ref: "first"})
  .describe("Click on option selects it and closes listbox popup.")
  .required();

  c.when("Click")
  .as("click")
  .on("document")
  .given("comboboxpopup.open")
  .then("comboboxpopup.closed")
  .describe("Clicking outside closes the listbox popup.")
  .required();



  //Enter 
  c.when("Enter")
  .as("keypress")
  .on("relative", 1)
  .given({type: "option.active", ref: "first"})
  .then({type: "option.selected", ref: "first"})
  .describe("Enter selects active option.")
  .required(); // I missed required and it still built the contract, only omitted that test. Should that be the case




  //Tab 
  c.when("Tab")
  .as("keypress")
  .on("main")
  .given("comboboxpopup.open")
  .then("comboboxpopup.closed")
  .describe("Tab closes open listbox popup when no active option.") 
  .required();


  c.when("Tab")
  .as("keypress")
  .on("main")
  .given({type: "option.active", ref: "first"})
  .then([{type: "option.selected", ref: "first"}, "comboboxpopup.closed", "main.blurred"])
  .describe("Tab selects active option, closes open listbox popup, and moves focus from main.") 
  .required();


  //Hover
  c.when("Hover")
  .as("hover")
  .on("options")
  .given("comboboxpopup.open")
  .then({type: "option.active", ref: "first"})
  .describe("Mouse hover sets aria-activedescendant to hovered option.")
  .required();

});