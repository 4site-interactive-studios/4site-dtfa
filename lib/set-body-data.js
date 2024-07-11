export const setBodyData = (dataName, value) => {
  const body = document.querySelector("body");
  if (!body) {
    return;
  }
  // If value is boolean
  if (typeof value === "boolean" && value === false) {
    body.removeAttribute(`data-4site-${dataName}`);
    return;
  }
  body.setAttribute(`data-4site-${dataName}`, value.toString());
};
