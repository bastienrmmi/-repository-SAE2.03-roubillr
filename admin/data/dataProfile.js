// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~roubille1/-repository-SAE2.03-roubillr";

let DataProfile = {};
/**
 * DataProfile.add
 *
 * Prend en paramètre un objet FormData (données de formulaire) à envoyer au serveur.
 * Ces données sont incluses dans une requête HTTP en méthode POST.
 * La requête comprend aussi un paramètre todo valant add pour indiquer au serveur qu'il
 * s'agit d'une création (car on a codé le serveur pour qu'il sache quoi faire en fonction de la valeur de todo).
 *
 * @param {*} fdata un objet FormData contenant les données du formulaire à envoyer au serveur.
 * @returns la réponse du serveur.
 */

DataProfile.add = async function (fdata) {
  // console.log("DataProfile.add 1"); // Point de repère n°1
  let config = {
    method: "POST", // méthode HTTP à utiliser
    body: fdata, // données à envoyer sous forme d'objet FormData
  };
  console.log("DataProfile.add 2 ", config); 

  let answer = await fetch(
    HOST_URL + "/server/script.php?todo=addProfile",
    config
  );
  // console.log("DataProfile.add 3 "); // Point de repère n°3
  let data = await answer.json();
  console.log(data);
  return data;
};

export { DataProfile };
