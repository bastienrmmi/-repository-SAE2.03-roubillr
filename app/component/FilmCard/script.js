let templateFile = await fetch("./component/FilmCard/template.html");
let template = await templateFile.text();

let FilmCard = {};

FilmCard.format = function (movies) {
  let html = "";
  for (let film of movies) {
    let htmlfilm = template;
    htmlfilm = htmlfilm.replace("{{id}}", film.id);
    htmlfilm = htmlfilm.replaceAll("{{title}}", film.name);
    htmlfilm = htmlfilm.replace("{{image}}", film.image);
    htmlfilm = htmlfilm.replace("{{like}}", "tolike.svg"); // Image par défaut

    html += htmlfilm;
  }
  return html;
};

FilmCard.toggleLike = async function (filmId) {
  // Récupère l'ID du profil sélectionné
  const profileSelect = document.querySelector("#profile-select");
  const profileId = profileSelect ? profileSelect.value : null;

  if (!profileId) {
    alert("Veuillez sélectionner un profil avant de liker un film.");
    return;
  }

  // Envoie une requête au serveur pour enregistrer le like
  let formData = new FormData();
  formData.append("profile_id", profileId);
  formData.append("film_id", filmId);

  let response = await fetch(
    "https://mmi.unilim.fr/~roubille1/-repository-SAE2.03-roubillr/server/script.php?todo=likeFilm",
    {
      method: "POST",
      body: formData,
    }
  );

  let result = await response.json();
  if (result.success) {
    // Met à jour l'image du bouton
    const likeButton = document.querySelector(`button[data-id="${filmId}"] img`);
    likeButton.src = likeButton.src.includes("tolike.svg")
      ? "../server/images/liked.svg"
      : "../server/images/tolike.svg";
  } else {
    alert("Erreur lors de l'enregistrement du like.");
  }
};

export { FilmCard };