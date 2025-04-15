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
    if (newCategory.movies.length > 0) {
      newCategories.push(newCategory);
    }
  }

  return newCategories;
};






DataMovie.addFavoris = async function (id_movie, id_profile) {
  let config = {
      method: "POST",
  };
  let answer = await fetch(`${HOST_URL}/server/script.php?todo=addFavoris&id_movie=${id_movie}&id_profile=${id_profile}`, config);
  let data = await answer.json();
  return data;
}

DataMovie.delFavoris = async function (id_movie, id_profile) {
  let config = {
      method: "POST",
  };
  let answer = await fetch(`${HOST_URL}/server/script.php?todo=delFavoris&id_movie=${id_movie}&id_profile=${id_profile}`, config);
  let data = await answer.json();
  return data;
}

DataMovie.getFavoris = async function (id_profile) {
  let response = await fetch(
    `${HOST_URL}/server/script.php?todo=getFavoris&id_profile=${id_profile}`
  );
  let data = await response.json();
  return data;
};


DataMovie.getLikes = async function (id_profile) {
  let response = await fetch(
    `${HOST_URL}/server/script.php?todo=getLikes&id_profile=${id_profile}`
  );
  let data = await response.json();
  
  return data;
};
export { DataMovie };