class CustomComboboxStrategy {
  constructor(mainSelector, selectors, actionTimeoutMs = 400, assertionTimeoutMs = 400) {
    this.mainSelector = mainSelector;
    this.selectors = selectors;
    this.actionTimeoutMs = actionTimeoutMs;
    this.assertionTimeoutMs = assertionTimeoutMs;
  }

  async resetState(page) {
    if (!this.selectors.popup) return;

    const popupElement = page.locator(this.selectors.popup).first();
    const isPopupVisible = await popupElement.isVisible().catch(() => false);
    if (!isPopupVisible) return;

    let closed = false;

    if (this.selectors.input) {
      await page.locator(this.selectors.input).first().focus();
      await page.keyboard.press("Escape");
      closed = await popupElement
        .waitFor({ state: "hidden" })
        .then(() => true)
        .catch(() => false);
    }

    if (!closed && this.selectors.button) {
      await page.locator(this.selectors.button).first().click({ timeout: this.actionTimeoutMs });
      closed = await popupElement
        .waitFor({ state: "hidden" })
        .then(() => true)
        .catch(() => false);
    }

    if (!closed) {
      await page.mouse.click(10, 10);
      closed = await popupElement
        .waitFor({ state: "hidden" })
        .then(() => true)
        .catch(() => false);
    }

    if (this.selectors.input) {
      await page.locator(this.selectors.input).first().fill("");
    }
  }

  async shouldSkipTest() {
    return false;
  }

  getMainSelector() {
    return this.mainSelector;
  }
}

export default CustomComboboxStrategy;