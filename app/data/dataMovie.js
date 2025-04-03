let HOST_URL = "https://mmi.unilim.fr/~roubille1/-repository-SAE2.03-roubillr";

let Datamovie = {};

Datamovie.requestMovie = async function () {
    let answer =await fetch(HOST_URL+ "/server/script.php?todo=readAll");
    let movies = await answer.json();
    return movies;
}
export { DataMovie };