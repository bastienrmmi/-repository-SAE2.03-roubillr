let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function ( hAbout,hProfile, profiles) {
  let html = template;
  let options = "";
  
  html = html.replace("{{handler}}", hProfile);
for (let p of profiles) {
    options += `<option value="${p.name}" data-img="${p.image}" data-dob="${p.datenaissance}">${p.name}</option>`;
    html = html.replace("{{name}}", p.name);
}

  let image = profiles[0]?.image || "";

  html = html.replace("{{options}}", options);
  html = html.replace("{{image}}", image);
  html = html.replace("{{hAbout}}", hAbout);

  return html;
};

/*########################### DISPARITION  ###########################*/
const navbar = document.getElementById('header');
let lastScrollTop = 0;
const scrollThreshold = 200; // Distance (en pxs) avant d'activer le comportement

    window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop; //stockage des données du scroll dans une variable "scrollTop"

        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Vers le bas
                navbar.classList.add('hidden'); // Si l'utilisateur a dépassé les 200 premiers pixels, le comportement s'active...
            } else {
                // Vers le haut
                navbar.classList.remove('hidden');  // ...et enlève bien la propriété "hidden" si il remonte. Normal.
            }
        } else {
            // Ça veut dire que les 200 pixels n'ont pas été atteints, et donc que le comportement n'est pas activé; la barre reste, qu'importe le mouvement.
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    }
);
/*########################### DISPARITION  ###########################*/

export { NavBar };
