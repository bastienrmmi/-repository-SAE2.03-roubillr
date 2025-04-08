let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (movies) {
  let html = "";
  for (let film of movies) {
    let htmlfilm = template;
    htmlfilm = htmlfilm.replace("{{id}}", film.id);
    htmlfilm = htmlfilm.replaceAll("{{title}}", film.name);
    htmlfilm = htmlfilm.replace("{{image}}", film.image);
    html += htmlfilm;
  }
  return html;
};


export { FilmCard };

