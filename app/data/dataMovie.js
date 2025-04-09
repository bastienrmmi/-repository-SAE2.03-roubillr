let HOST_URL = "https://mmi.unilim.fr/~roubille1/-repository-SAE2.03-roubillr";

let DataMovie = {};

DataMovie.requestMovie = async function () {
    let answer = await fetch(HOST_URL+ "/server/script.php?todo=readAll");
    let movies = await answer.json();

    return movies;
}
DataMovie.getMovieById = async function (id) {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=detailById&id=" + id);
    let movie = await answer.json();
    return movie;
  };
// DataMovies.requestMovieDetails = async function (movieId) {
//     let url = HOST_URL + `/server/script.php?todo=readMovieDetail&id=${movieId}`;
//     console.log("URL générée :", url); // Vérifiez l'URL générée
//     let answer = await fetch(url);
//     let movieDetails = await answer.json();
//     return movieDetails;
// };
DataMovie.requestMoviesByCategory = async function () {
  let answer = await fetch(HOST_URL + "/server/script.php?todo=readMoviesCategory");
  let categories = await answer.json();
  return categories;
};
export { DataMovie };