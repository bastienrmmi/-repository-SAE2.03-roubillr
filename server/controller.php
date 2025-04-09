<?php

require("model.php");

function readAllMoviesController(){
    return getMovies();
}

function addMovieController(){
    $titre = $_REQUEST['titre'] ?? null;
    $realisateur = $_REQUEST['realisateur'] ?? null;
    $annee = $_REQUEST['annee'] ?? null;
    $duree = $_REQUEST['duree'] ?? null;
    $desc = $_REQUEST['desc'] ?? null;
    $categorie = $_REQUEST['categorie'] ?? null;
    $image = $_REQUEST['image'] ?? null;
    $url = $_REQUEST['url'] ?? null;
    $age = $_REQUEST['age'] ?? null;

    if (empty($titre) || empty($realisateur) || empty($annee) || empty($duree) || empty($desc) || empty($categorie) || empty($image) || empty($url) || empty($age)) {
        return "Erreur : Tous les champs doivent être remplis.";
    }

    $ok = addMovie($titre, $realisateur, $annee, $duree, $desc, $categorie, $image, $url, $age);
    
    if ($ok!=0){
      return "Le film $titre a bien été ajouté !";
    } 
    else{
      return "Erreur lors de l'ajout du film $titre !";
    }
}

function readAllMovieDetailByIdController(){
  $id = $_REQUEST['id'] ?? null;
  return getMovieDetailById($id);
}

function readMoviesByCategoryController() {
  $categories = getMoviesByCategory();
  return $categories ? $categories : false;
}