import { createContract } from "aria-ease/contract";

export const menuContract = createContract("menu", (c) => {
    c.meta({
        id: "docs.custom.contract.menu",
        version: "1.0.0",
        created: "11-02-2026",
        lastUpdated: "19-03-2026",
        description: "Simple fluent DSL example for menu custom policy",
        source: {
        apg: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/",
        wcag: ["2.2 AA"],
        },
        W3CName: "Menu",
    });

    c.selectors({
        main: "[aria-controls][aria-haspopup][aria-expanded]:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio']), [aria-haspopup][aria-expanded]:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio'])", // broad selector to allow for different implementations
        items: "[role=menuitem], [role=menuitemradio], [role=menuitemcheckbox]", 
        submenuTrigger: "[role=menu] [role=menuitem][aria-haspopup=true], [role=menu] [role=menuitemradio][aria-haspopup=true], [role=menu] [role=menuitemcheckbox][aria-haspopup=true], [role=menu] [role=menuitem][aria-haspopup=menu], [role=menu] [role=menuitemradio][aria-haspopup=menu], [role=menu] [role=menuitemcheckbox][aria-haspopup=menu]",
        submenu: "[role=menu] [role=menu]",
        submenuItems: "[role=menu] [role=menu] > [role=menuitem], [role=menu] [role=menu] > [role=menuitemradio], [role=menu] [role=menu] > [role=menuitemcheckbox]",
        leafItem: "[role=menu] [role=menuitem]:not([aria-haspopup]), [role=menu] [role=menuitemradio]:not([aria-haspopup]), [role=menu] [role=menuitemcheckbox]:not([aria-haspopup])", //used to target a menuitem without a submenu
        relative: "[role=menuitem], [role=menuitemradio], [role=menuitemcheckbox]",
        popup: "[role=menu]"
    });

    c.relationships((r) => {
        r.ariaReference("main", "aria-controls", "popup").requires("menupopup.open").required();
        r.ariaReference("popup", "aria-labelledby", "main").requires("menupopup.open").optional(); 
        r.contains("popup", "items").requires("menupopup.open").required();
        r.contains("submenu", "submenuItems").requires("submenupopup.open").required(); 
    });

    c.static((s) => {
        s.target("main").has("aria-haspopup", "true | menu").required();
        s.target("main").has("aria-expanded", "false").required();
        s.target("main").has("aria-controls", "!empty").required(); // add support to check actual value
        s.target("popup").has("aria-labelledby", "!empty").requires("menupopup.open").optional(); // add support to check actual value
        s.target("popup").has("role", "menu").requires("menupopup.open").required();
        s.target("items").has("role", "menuitem | menuitemcheckbox | menuitemradio").requires("menupopup.open").required();
        s.target("items").has("tabindex", "-1").requires("menupopup.open").optional(); // not necessary if roving tabindex is implemented, but good to have for accessibility in general
        s.target("submenuTrigger").has("aria-haspopup", "true | menu").requires("submenupopup.open").optional();
    });

    // Escape
    c.when("Escape")
    .as("keypress")
    .on("items")
    .given("menupopup.open")
    .then("menupopup.closed")
    .describe("Escape closes an open menu popup.")
    .required();


    //Click
    c.when("Click")
    .as("click")
    .on("main")
    .given("menupopup.closed")
    .then("menupopup.open")
    .describe("Click on a menu button when menu closed opens the menu popup.")
    .required();

    c.when("Click")
    .as("click")
    .on("main")
    .given("menupopup.open")
    .then("menupopup.closed")
    .describe("Click on a menu button when menu open closes the menu popup.")
    .required();

    

    // Enter
    c.when("Enter")
    .as("keypress")
    .on("items")
    .given("menupopup.open")
    .then("menupopup.closed")
    .describe("Enter on a menu item closes an open menu popup.")
    .required();

    
    //Space
    c.when("Space")
    .as("keypress")
    .on("items")
    .given("menupopup.open")
    .then("menupopup.closed")
    .describe("Space on a menu item closes an open menu popup.")
    .required();

    //ArrowDown
    c.when("ArrowDown")
    .as("keypress")
    .on("items")
    .given("menupopup.open")
    .then({type: "menuitem.focused", ref: "second"})
    .describe("ArrowDown on a menu item moves focus to the next menu item when the menu popup is open.")
    .required();

    //ArrowUp
    c.when("ArrowUp")
    .as("keypress")
    .on("items")
    .given("menupopup.open")
    .then({type: "menuitem.focused", ref: "last"})
    .describe("ArrowUp on a menu item moves focus to the previous menu item when the menu popup is open.")
    .required();

    //Home
    c.when("Home")
    .as("keypress")
    .on("items")
    .given("menupopup.open")
    .then({type: "menuitem.focused", ref: "first"})
    .describe("Home on a menu item moves focus to the first menu item when the menu popup is open.")
    .required();

    //End
    c.when("End")
    .as("keypress")
    .on("items")
    .given("menupopup.open")
    .then({type: "menuitem.focused", ref: "last"})
    .describe("End on a menu item moves focus to the last menu item when the menu popup is open.")
    .required();


     //Tab
    c.when("Tab")
    .as("keypress")
    .on("items") //maybe support array of elements
    .given("menupopup.open")
    .then(["menupopup.closed", "main.blurred"])
    .describe("Tab on a menu item closes an open menu popup and moves focus to the next focusable element in the tab order after the menu.")
    .required();

    //ArrowRight
    c.when("ArrowRight")
    .as("keypress")
    .on("submenuTrigger")
    .given("menupopup.open")
    .then({type: "submenuitem.focused", ref: "first"})
    .describe("ArrowRight on a menu item with a submenu opens the submenu and moves focus to the first item when the menu popup is open.")
    .required();

    //ArrowLeft
    c.when("ArrowLeft")
    .as("keypress")
    .on("submenuItems")
    .given("submenupopup.open")
    .then(["submenupopup.closed", "submenutrigger.focused"])
    .describe("ArrowLeft on a submenu item closes the submenu and moves focus to the submenu trigger.")
    .required();
})