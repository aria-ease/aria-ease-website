import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";

afterAll(async () => {
  await cleanupTests();
});

describe("Accordion Accessibility Test", () => {
  test("renders Accordion without accessibility violation(s)", async () => {
    await testUiComponent("accordion", null, "http://localhost:5173/test-harness?component=accordion");
  });
});

describe("Combobox Accessibility Test", () => {
  test("renders Combobox without accessibility violation(s)", async () => {
    await testUiComponent("combobox", null, "http://localhost:5173/test-harness?component=combobox");
  });
});

describe("Menu Accessibility Test", () => {
  test("renders Menu without accessibility violation(s)", async () => {
    await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");
  });
});

describe("Horizontal Tabs Accessibility Test", () => {
  test("renders horizontal tabs without accessibility violation(s)", async () => {
    await testUiComponent("tabs", null, "http://localhost:5173/test-harness?component=tabs_horizontal");
  });
});

describe("Vertical Tabs Accessibility Test", () => {
  test("renders vertical tabs without accessibility violation(s)", async () => {
    await testUiComponent("tabs", null, "http://localhost:5173/test-harness?component=tabs_vertical");
  });
});