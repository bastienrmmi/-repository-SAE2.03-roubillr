let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (film) {
  let html = template;
  html = html.replace("{{image}}", film.image);
  html = html.replace("{{name}}", film.name);
  return html;
};

export { FilmCard };

