import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";

afterAll(async () => {
  await cleanupTests();
});

describe("Accordion WAI-ARIA Accessibility Test", () => {
  test("Accordion meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("accordion", null, "http://localhost:5173/test-harness?component=accordion");
  });
});

describe("Combobox with Listbox popup WAI-ARIA Accessibility Test", () => {
  test("Combobox with Listbox popup meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("combobox.listbox", null, "http://localhost:5173/test-harness?component=combobox_listbox");
  });
});

describe("Horizontal Tabs WAI-ARIA Accessibility Test", () => {
  test("Horizontal tabs meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("tabs", null, "http://localhost:5173/test-harness?component=tabs_horizontal");
  });
});

describe("Vertical Tabs WAI-ARIA Accessibility Test", () => {
  test("Vertical tabs meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("tabs", null, "http://localhost:5173/test-harness?component=tabs_vertical");
  });
});

describe("Menu with submenu WAI-ARIA Accessibility Test", () => {
  test("Menu with submenu meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=sub_menu");
  });
});

describe("Menu WAI-ARIA Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");
  });
});