let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (name) {
  let html = template;

  html = html.replace("{{name}}", name);
  return html;
};

export { FilmCard };
