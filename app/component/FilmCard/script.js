let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (movies, ) {
  let html = "";
  for (let film of movies) {
    let htmlfilm = template;
    // if (favorites_icon.includes(film.id)) {
    //   htmlfilm = htmlfilm.replace("{{path_like}}", "../server/images/liked.svg");
    // } else {
    //   htmlfilm = htmlfilm.replace("{{path_like}}", "../server/images/tolike.svg");
    // }
    htmlfilm = htmlfilm.replace("{{id}}", film.id);
    htmlfilm = htmlfilm.replaceAll("{{title}}", film.name);
    htmlfilm = htmlfilm.replace("{{image}}", film.image);
    
    html += htmlfilm;
    
  }
  
  return html;
};


export { FilmCard };

