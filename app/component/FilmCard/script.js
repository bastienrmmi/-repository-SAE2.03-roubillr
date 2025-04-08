let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};
let GetId = {};

FilmCard.format = function (movies) {
  let html = "";
  for (let film of movies) {
    let htmlfilm = template;
    htmlfilm = htmlfilm.replace("{{id}}", film.id);
    htmlfilm = htmlfilm.replace("{{title}}", film.name);
    htmlfilm = htmlfilm.replace("{{image}}", film.image);
    html += htmlfilm;
  }
  return html;
};

GetId = function () {
  let sah = "";
  if (handlerInfo == true) {
    sah = film.id;
    handlerInfo = false;
  }
  return sah;
}

export { FilmCard };
export { GetId };

