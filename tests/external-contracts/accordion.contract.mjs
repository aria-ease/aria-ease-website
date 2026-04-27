import { createContract } from "aria-ease";

export const accordionContract = createContract("accordion", (c) => {
    c.meta({
        id: "aria-ease.contract.accordion",
        version: "1.0.0",
        created: "09-02-2026",
        lastUpdated: "19-03-2026",
        description: "ARIA Accordion interaction contract. Validates the ARIA and interaction contract for a custom accordion component.",
        source: {
            apg: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
            wcag: ["2.2 AA"]
        },
        W3CName: "Accordion"
    });

    c.selectors({
        main: "[aria-controls][aria-expanded]",
        trigger: "[aria-controls][aria-expanded]",
        relative: "[aria-controls][aria-expanded]",
        panel: "[role='region'][aria-labelledby]"
    });

    c.static((s) => {
        s.target("trigger").has("aria-expanded", "false").required();
    });

    c.relationships((r) => {
        r.ariaReference("trigger", "aria-controls", "panel").recommended();
        r.ariaReference("panel", "aria-labelledby", "trigger").recommended();
    });

    c.when("Click")
    .as("click")
    .on("relative", 1)
    .given({type: "panel.collapsed", ref: 1})
    .then({type: "panel.expanded", ref: 1})
    .describe("Click expands a collapsed panel.")
    .required();

    c.when("Click")
    .as("click")
    .on("relative", 2)
    .given({type: "panel.expanded", ref: 2})
    .then({type: "panel.collapsed", ref: 2})
    .describe("Click collapses an expanded panel.")
    .required();

    c.when("Enter")
    .as("keypress")
    .on("relative", 3)
    .given({type: "panel.collapsed", ref: 3})
    .then({type: "panel.expanded", ref: 3})
    .describe("Enter expands a collapsed panel.")
    .required();

    c.when("Enter")
    .as("keypress")
    .on("relative", 1)
    .given({type: "panel.expanded", ref: 1})
    .then({type: "panel.collapsed", ref: 1})
    .describe("Enter collapses an expanded panel.")
    .required();

    c.when("Space")
    .as("keypress")
    .on("relative", 2)
    .given({type: "panel.collapsed", ref: 2})
    .then({type: "panel.expanded", ref: 2})
    .describe("Space expands a collapsed panel.")
    .required();

    c.when("Space")
    .as("keypress")
    .on("relative", 3)
    .given({type: "panel.expanded", ref: 3})
    .then({type: "panel.collapsed", ref: 3})
    .describe("Space collapses an expanded panel.")
    .required();
})