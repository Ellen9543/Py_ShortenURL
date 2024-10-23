import Alpine from "alpinejs";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faLink as faLink } from "@fortawesome/free-solid-svg-icons";

library.add(faLink);
dom.i2svg();

Alpine.data("container", () => ({
  url: "",
  shortURL: "",
  active: true,
  showLinkIcon: false,

  isValidURL(inputURL) {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    return urlPattern.test(inputURL);
  },

  checkURL(inputURL) {
    let isValid = true;
    if (inputURL == "") {
      alert("請輸入連結");
      isValid = false;
    } else if (!this.isValidURL(inputURL)) {
      alert("請檢查連結格式是否正確");
      isValid = false;
    }
    return isValid;
  },

  setShortURL() {
    const shortURL = this.shortURL.trim();
    let shortCode = shortURL;
    if (shortURL != "") {
      if (shortURL.startsWith(location.href)) {
        shortCode = shortURL.split(location.href).pop();
      } else if (shortURL.startsWith("http")) {
        alert("請檢查短網址格式是否正確");
        return;
      }
    }

    const inputURL = this.url.trim();
    if (this.checkURL(inputURL)) {
      this.submitURL(inputURL, shortCode);
    }
  },

  async submitURL(inputURL, shortCode) {
    const isActive = this.active;
    try {
      let response = await fetch("/api/submit_url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          url: inputURL,
          short_code: shortCode,
          is_active: isActive,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      this.shortURL = location.href + data.short_url;

      if (this.active) {
        this.showLinkIcon = true;
      } else {
        this.showLinkIcon = true;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));

Alpine.start();
