export const logger = (message, color = "#fff", bg = "#F00") => {
  const coloredMessage = `%c${message}`;
  const style = `color: ${color}; background-color: ${bg}; padding: 2px 4px; border-radius: 2px;`;
  console.log(coloredMessage, style);
};
