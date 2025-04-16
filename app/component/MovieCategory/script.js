import { FilmCard } from "../FilmCard/script.js";

let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (category, bruh) {
    let categoryHtml = template;
    categoryHtml = categoryHtml.replace("{{categoryName}}", category.name);
    

    
    let moviesListHtml = FilmCard.format(category.movies || [], bruh);
    categoryHtml = categoryHtml.replace("{{movieCard}}", moviesListHtml);


    return categoryHtml;
};

export { MovieCategory };