import { logger } from "./logger.js";
import { setBodyData } from "./set-body-data.js";

export class iFrame {
  constructor() {
    this.logger = logger;
    if (this.inIframe()) {
      this.run();
      // Remove the skip link markup when inside an iFrame
      const skipLink = document.querySelector(".skip-link");
      if (skipLink) {
        skipLink.remove();
      }
    } else {
      this.logger("Not in iframe");
    }
  }

  run() {
    // Add the data-engrid-embedded attribute when inside an iFrame if it wasn't already added by a script in the Page Template
    setBodyData("embedded", "");
    this.sendIframeHeight();
    window.parent.postMessage(
      {
        scroll: this.shouldScroll(),
      },
      "*"
    );
    // On click fire the resize event
    document.addEventListener("click", (e) => {
      this.logger("iFrame Event - click");
      setTimeout(() => {
        this.sendIframeHeight();
      }, 100);
    });
    // Send the iFrame height after 3000ms to ensure the page has loaded
    window.setTimeout(() => {
      this.sendIframeHeight();
    }, 3000);
    // Send the iFrame height on window resize
    window.addEventListener(
      "resize",
      this.debounceWithImmediate(() => {
        this.logger("iFrame Event - window resized");
        this.sendIframeHeight();
      })
    );
    // Listen for messages from the parent window
    window.addEventListener("message", (event) => {
      if (event.data.frequency) {
        this.logger(
          "iFrame Event - Received frequency: " + event.data.frequency
        );
        const frequency = document.querySelector(
          `label[for="${event.data.frequency}"]`
        );
        if (frequency) {
          frequency.click();
        }
      }
    });
  }

  sendIframeHeight() {
    let height = document.body.offsetHeight;
    this.logger("iFrame Event - Sending iFrame height of: " + height + "px"); // check the message is being sent correctly
    window.parent.postMessage(
      {
        frameHeight: height,
      },
      "*"
    );
  }
  sendIframeFormStatus(status) {
    window.parent.postMessage(
      {
        status: status,
      },
      "*"
    );
  }
  shouldScroll() {
    const error = document.querySelector(".ErrorMessage");
    // If there is an error on the page, scroll to the top of the iFrame
    return error ? true : false;
  }
  inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  debounceWithImmediate(func, timeout = 1000) {
    let timer;
    let firstEvent = true;

    return (...args) => {
      clearTimeout(timer);

      if (firstEvent) {
        func.apply(this, args);
        firstEvent = false;
      }

      timer = setTimeout(() => {
        func.apply(this, args);
        firstEvent = true;
      }, timeout);
    };
  }
}
