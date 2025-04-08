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
    console.log(movie);
    return movie;
  };
export { DataMovie };