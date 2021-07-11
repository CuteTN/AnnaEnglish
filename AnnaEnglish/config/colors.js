export const colors = {
  primary: "#52C2F2",
  white: "#ffff",
  whiteShade: "#FFECCC",
  whiteShadeBg: "#EBEAEC",
  gray: "#A1A4B2",
  bg: "#F2F3F7",
  secondaryBg: "#E5E5E5",
  darkBg: "#333242",
  lightBg: "#ECD3C2",
  heading: "#3366CC",
  facebookBg: "#7583CA",
  black: "#000000",
  icon: "#FF4000",
  text: "#201E1F",
  card: "#FEEFDD",
  border: "#FAAA8D",
  statiticcard: "#E4FDE1",
  cardborder: "#8ACB88",
  pastelGreen: "#a5fbae",
  game: "#F6DEF4",
};

export const colorAnswer = [
  "#52C2F2",
  "#00aefd",
  "#FFA400",
  "#07a787",
  "#ff7870",
  "pink",
  "yellow",
  "#e74c3c",
  "#2979ff",
];

export const randomColor = () => {
  return colorAnswer[Math.floor(Math.random() * colorAnswer.length)];
};
