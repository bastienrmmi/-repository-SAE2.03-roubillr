let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (films) {
  let html = "";
  films.forEach((film)=>{
    let filmHtml = template;
    filmHtml = filmHtml.replace("{{image}}", film.image);
    filmHtml = filmHtml.replace("{{name}}", film.name);
    html += filmHtml;
})
  return html;
};

export { FilmCard };
