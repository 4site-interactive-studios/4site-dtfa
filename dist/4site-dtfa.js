(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".nudge-wrapper{transition:all .5s ease;max-height:0;overflow:hidden}body[data-4site-donation-frequency=one-time] .nudge-wrapper{max-height:65px}body[data-4site-embedded]{background-image:none!important;background-color:#fff}body[data-4site-embedded] header{display:none}body[data-4site-embedded] form{margin:0 auto!important;padding:0;border:1px solid #c8102e}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
const r = (n, e = "#fff", t = "#F00") => {
  const o = `%c${n}`, i = `color: ${e}; background-color: ${t}; padding: 2px 4px; border-radius: 2px;`;
  console.log(o, i);
}, s = (n, e) => {
  const t = document.querySelector("body");
  if (t) {
    if (typeof e == "boolean" && e === !1) {
      t.removeAttribute(`data-4site-${n}`);
      return;
    }
    t.setAttribute(`data-4site-${n}`, e.toString());
  }
}, c = (n, ...e) => {
  for (let t = 0; t < e.length; t++) {
    if (!n || !n.hasOwnProperty(e[t]))
      return !1;
    n = n[e[t]];
  }
  return !0;
};
class u {
  constructor() {
    if (this.logger = r, this.inIframe()) {
      this.run();
      const e = document.querySelector(".skip-link");
      e && e.remove();
    } else
      this.logger("Not in iframe");
  }
  run() {
    s("embedded", ""), this.sendIframeHeight(), window.parent.postMessage(
      {
        scroll: this.shouldScroll()
      },
      "*"
    ), document.addEventListener("click", (e) => {
      this.logger("iFrame Event - click"), setTimeout(() => {
        this.sendIframeHeight();
      }, 100);
    }), window.setTimeout(() => {
      this.sendIframeHeight();
    }, 3e3), window.addEventListener(
      "resize",
      this.debounceWithImmediate(() => {
        this.logger("iFrame Event - window resized"), this.sendIframeHeight();
      })
    );
  }
  sendIframeHeight() {
    let e = document.body.offsetHeight;
    this.logger("iFrame Event - Sending iFrame height of: " + e + "px"), window.parent.postMessage(
      {
        frameHeight: e
      },
      "*"
    );
  }
  sendIframeFormStatus(e) {
    window.parent.postMessage(
      {
        status: e
      },
      "*"
    );
  }
  getIFrameByEvent(e) {
    return [].slice.call(document.getElementsByTagName("iframe")).filter((t) => t.contentWindow === e.source)[0];
  }
  shouldScroll() {
    return !1;
  }
  inIframe() {
    try {
      return window.self !== window.top;
    } catch {
      return !0;
    }
  }
  debounceWithImmediate(e, t = 1e3) {
    let o, i = !0;
    return (...d) => {
      clearTimeout(o), i && (e.apply(this, d), i = !1), o = setTimeout(() => {
        e.apply(this, d), i = !0;
      }, t);
    };
  }
}
function a() {
  if (r("4Site Init", "#000", "#FF0"), new u(), c(window, "donationForm", "state", "donationFrequency")) {
    const n = window.donationForm.state.donationFrequency();
    s("donation-frequency", n), document.querySelectorAll(
      'input[name="frequency"]'
    ).forEach((t) => {
      t.addEventListener("change", () => {
        const o = window.donationForm.state.donationFrequency();
        s("donation-frequency", o);
      });
    });
  } else
    r("Donation frequency not found", "#000", "#F00");
}
document.readyState === "complete" ? a() : window.addEventListener("load", a);
