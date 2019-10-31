const styled = Component => styles => {
  return props => {};
};

[
  "div",
  "span",
  "button",
  "input",
  "ul",
  "li",
  "ol",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5"
].forEach(elementName => {
  styled[elementName] = styled(elementName);
});
