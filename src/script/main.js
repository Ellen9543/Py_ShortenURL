import Alpine from "alpinejs";
import Swal from "sweetalert2";
import { Toast } from "./alert.js";

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
      Toast.fire({
        text: "請輸入連結",
        icon: "warning",
      });
      isValid = false;
    } else if (!this.isValidURL(inputURL)) {
      Toast.fire({
        text: "請檢查連結格式是否正確",
        icon: "warning",
      });
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
        Toast.fire({
          text: "取得頁面資訊",
          icon: "success",
        });
      } catch (error) {
        console.error("Error:", error);
        Toast.fire({
          text: "無法取得頁面資訊",
          icon: "error",
        });
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
        Toast.fire({
          text: "請檢查短網址格式是否正確",
          icon: "warning",
        });
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

      if ("fail" == data.status) {
        Toast.fire({
          text: data.error,
          icon: "error",
        });
        this.shortURL = "";
        return;
      }

      this.shortURL = location.href + data.short_url;

      if (this.active) {
        this.showLinkIcon = true;
        this.activeMsg = "";

        // 取 copy icon 的 svg
        const svg = document.querySelector('[data-icon="copy"]');
        Swal.fire({
          title: "<strong>短網址產生成功</strong>",
          icon: "success",
          html: `<a href="${this.shortURL}" target="_blank" class="text-sky-700 underline pr-2">${this.shortURL}</a>
                 <button id="copyButton">${svg.outerHTML}<button>`,
          showCloseButton: true,

          didOpen: () => {
            // 開後綁定click事件
            const copyButton =
              Swal.getHtmlContainer().querySelector("#copyButton");
            copyButton.addEventListener("click", () => {
              this.copyShortURL();
            });
          },
        });
      } else {
        this.showLinkIcon = false;
        this.activeMsg = "尚未啟用";

        Swal.fire({
          title: "<strong>短網址產生成功</strong>",
          icon: "success",
          html: this.activeMsg,
          showCloseButton: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },

  copyShortURL() {
    navigator.clipboard
      .writeText(this.shortURL)
      .then(() => {
        Toast.fire({
          text: "已複製",
          icon: "success",
        });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  },
}));
