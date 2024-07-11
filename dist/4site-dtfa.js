(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".nudge-wrapper{transition:all .5s ease;max-height:0;overflow:hidden}body[data-4site-donation-frequency=one-time] .nudge-wrapper{max-height:65px}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const r = (n, t = "#fff", e = "#F00") => {
  const o = `%c${n}`, d = `color: ${t}; background-color: ${e}; padding: 2px 4px; border-radius: 2px;`;
  console.log(o, d);
}, c = (n, t) => {
  const e = document.querySelector("body");
  if (e) {
    if (typeof t == "boolean" && t === !1) {
      e.removeAttribute(`data-4site-${n}`);
      return;
    }
    e.setAttribute(`data-4site-${n}`, t.toString());
  }
}, s = (n, ...t) => {
  for (let e = 0; e < t.length; e++) {
    if (!n || !n.hasOwnProperty(t[e]))
      return !1;
    n = n[t[e]];
  }
  return !0;
};
function i() {
  if (r("4Site Init", "#000", "#FF0"), s(window, "donationForm", "state", "donationFrequency")) {
    const n = window.donationForm.state.donationFrequency();
    c("donation-frequency", n), document.querySelectorAll(
      'input[name="frequency"]'
    ).forEach((e) => {
      e.addEventListener("change", () => {
        const o = window.donationForm.state.donationFrequency();
        c("donation-frequency", o);
      });
    });
  } else
    r("Donation frequency not found", "#000", "#F00");
}
document.readyState === "complete" ? i() : window.addEventListener("load", i);
