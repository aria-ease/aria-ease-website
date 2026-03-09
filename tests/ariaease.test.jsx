import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";

afterAll(async () => {
  await cleanupTests();
});

describe("Accordion WAI-ARIA Accessibility Test", () => {
  test("renders Accordion without accessibility violation(s)", async () => {
    await testUiComponent("accordion", null, "http://localhost:5173/test-harness?component=accordion");
  });
});

describe("Combobox WAI-ARIA Accessibility Test", () => {
  test("Combobox meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    await testUiComponent("combobox", null, "http://localhost:5173/test-harness?component=combobox");
  });
});

describe("Menu WAI-ARIA Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");
  });
});

describe("Horizontal Tabs WAI-ARIA Accessibility Test", () => {
  test("Horizontal tabs meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    await testUiComponent("tabs", null, "http://localhost:5173/test-harness?component=tabs_horizontal");
  });
});

describe("Vertical Tabs WAI-ARIA Accessibility Test", () => {
  test("Vertical tabs meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    await testUiComponent("tabs", null, "http://localhost:5173/test-harness?component=tabs_vertical");
  });
});