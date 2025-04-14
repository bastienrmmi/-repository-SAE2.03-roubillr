let HOST_URL = "https://mmi.unilim.fr/~roubille1/-repository-SAE2.03-roubillr";

let DataProfile = {};

DataProfile.requestProfile = async function () {
    let answer = await fetch(HOST_URL+ "/server/script.php?todo=readProfile");
    let Profiles = await answer.json();

    return Profiles;
}

export { DataProfile };