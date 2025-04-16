let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (movies, movieId) {
  let html = "";

  for (let film of movies) {
    let htmlfilm = template;

    // Vérifie si ce film est dans la liste des ID likés
    let isLiked = movieId.includes(film.id);
    let likeImage = "";
    // Choisir l'image de like en fonctionlet likeImage;
    if (isLiked) {
      
      likeImage = '<button onclick="{{handlerDelete}}" data-id="{{id}}"><img class="filmcard__like" src="../server/images/liked.svg" alt="like" /></button>';
    } else {
      likeImage = '<button onclick="{{handlerFavoris}}" data-id="{{id}}"><img class="filmcard__like" src="../server/images/tolike.svg" alt="like" /></button>';
    }
    htmlfilm = htmlfilm.replace("{{like}}", likeImage);
    
    htmlfilm = htmlfilm.replace("{{handlerFavoris}}", `C.handlerFavoris(${film.id})`);
    htmlfilm = htmlfilm.replace("{{handlerDelete}}", `C.handlerdeleteFavoris(${film.id})`);

    // Remplacer les autres balises
    htmlfilm = htmlfilm.replace("{{id}}", film.id);
    htmlfilm = htmlfilm.replaceAll("{{title}}", film.name);
    htmlfilm = htmlfilm.replace("{{image}}", film.image);

    html += htmlfilm;
  }

  return html;
};

export { FilmCard };
