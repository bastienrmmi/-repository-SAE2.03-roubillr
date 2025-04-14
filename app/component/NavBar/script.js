let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, hProfile, profiles) {
  let html = template;

  // Début des options avec une valeur par défaut "Tous les films"
  let options = '<option class="g" value="" data-img="Empty.png" data-dob="1900-01-01"> Tous les films </option>';
  console.log(options);

  // Remplace {{handler}} dans le template HTML par la valeur hProfile
  html = html.replace("{{handler}}", hProfile);

  if (profiles) {
    // Boucle sur tous les profils pour générer les <option>
    for (let p of profiles) {
      // Si aucune image n’est définie, on utilise une image par défaut
      if (p.image === "") {
        p.image = "Empty.png";
      }

      options += `<option value="${p.name}" data-img="${p.image}" data-dob="${p.datenaissance}">${p.name}</option>`;
     
    }
  }
  // Gestion de l'image à afficher au chargement : si pas d'image dans le premier profil, on met l'image par défaut
  let image = "";

  if (profiles[0] && profiles[0].image) {
    image = profiles[0].image;
  } else {
    image = "Empty.png";
  }

  // Remplacement des placeholders dans le template HTML
  html = html.replace("{{options}}", options);
  html = html.replace("{{image}}", image);
  html = html.replace("{{hAbout}}", hAbout);

  return html;
};

/*########################### DISPARITION  ###########################*/
const navbar = document.getElementById("header");
let lastScrollTop = 0;
const scrollThreshold = 200; // Distance (en pxs) avant d'activer le comportement

window.addEventListener("scroll", function () {
  let scrollTop = document.documentElement.scrollTop; //stockage des données du scroll dans une variable "scrollTop"

  if (scrollTop > scrollThreshold) {
    if (scrollTop > lastScrollTop) {
      // Vers le bas
      navbar.classList.add("hidden"); // Si l'utilisateur a dépassé les 200 premiers pixels, le comportement s'active...
    } else {
      // Vers le haut
      navbar.classList.remove("hidden"); // ...et enlève bien la propriété "hidden" si il remonte. Normal.
    }
  } else {
    // Ça veut dire que les 200 pixels n'ont pas été atteints, et donc que le comportement n'est pas activé; la barre reste, qu'importe le mouvement.
    navbar.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});
/*########################### DISPARITION  ###########################*/

export { NavBar };
