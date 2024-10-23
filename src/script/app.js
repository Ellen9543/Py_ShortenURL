import Alpine from "alpinejs";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faLink as faLink,
  faCopy as faCopy,
  faCloudArrowDown as faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faLink, faCopy, faCloudArrowDown);
dom.i2svg();

Alpine.data("container", () => ({
  url: "",
  shortURL: "",
  active: true,
  showLinkIcon: false,
  activeMsg: "",
  urlInfo: "",

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

  async getURLInfo() {
    const inputURL = this.url.trim();
    if (this.checkURL(inputURL)) {
      try {
        let response = await fetch(inputURL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        const title = doc.querySelector("title").innerText;
        const description = doc.querySelectorAll('meta[name="description"]')[0];

        const metaInfo = [];
        metaInfo.push(`title => ${title}`);

        if (description) {
          metaInfo.push(
            `description => ${description.getAttribute("content")}`
          );
        }

        this.urlInfo = metaInfo.join("\n");
        alert("取得頁面資訊");
      } catch (error) {
        console.error("Error:", error);
      }
    }
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
        this.activeMsg = "";
      } else {
        this.showLinkIcon = false;
        this.activeMsg = "尚未啟用";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },

  copyShortURL() {
    navigator.clipboard
      .writeText(this.shortURL)
      .then(() => {
        alert("已複製");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  },
}));

Alpine.start();
