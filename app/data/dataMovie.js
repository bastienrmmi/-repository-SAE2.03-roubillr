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

DataMovie.requestMoviesByCategory = async function (age = 99) {
  let answer = await fetch(HOST_URL + "/server/script.php?todo=readMoviesCategory");
  let categories = await answer.json();
  let newCategories = [];
  for(let c of categories){
    let newCategory = {name: c.name, movies: []};
    for(let m of c.movies){
      if(m.min_age < age){
        newCategory.movies.push(m);
      }
    }
    newCategories.push(newCategory);
  }

  return newCategories;
};
export { DataMovie };