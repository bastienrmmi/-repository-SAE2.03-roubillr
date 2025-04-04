let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (movies) {
  let html = "";
  movies.forEach((film) =>  {
    let htmlfilm = template;
    htmlfilm = htmlfilm.replace("{{name}}", film.name);
    htmlfilm = htmlfilm.replace("{{image}}", film.image);
    html += htmlfilm;
  });
  return html;
};

export { FilmCard };

