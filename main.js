import "./style.css";
import { logger } from "./lib/logger.js";
import { setBodyData } from "./lib/set-body-data.js";
import { checkNested } from "./lib/check-nested.js";

function run() {
  logger("4Site Init", "#000", "#FF0");

  // Get the donation frequency and set the body data
  if (checkNested(window, "donationForm", "state", "donationFrequency")) {
    const frequency = window.donationForm.state.donationFrequency();
    setBodyData("donation-frequency", frequency);
    // Add donation frequency to the body on frequency change
    const gift_frequencies = document.querySelectorAll(
      'input[name="frequency"]'
    );
    gift_frequencies.forEach((frequency) => {
      frequency.addEventListener("change", () => {
        const freq = window.donationForm.state.donationFrequency();
        setBodyData("donation-frequency", freq);
      });
    });
  } else {
    logger("Donation frequency not found", "#000", "#F00");
  }
}
// Make sure we only run after the page load, checking if the page is fully loaded
if (document.readyState === "complete") {
  run();
} else {
  window.addEventListener("load", run);
}
