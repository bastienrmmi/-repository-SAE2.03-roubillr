<?php

define("HOST", "localhost");
define("DBNAME", "roubille1");
define("DBLOGIN", "roubille1");
define("DBPWD", "roubille1");


function getMovies(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT id, name, image FROM Movie";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function addMovie($name, $real, $annee, $length, $description, $categorie, $image, $trailer, $pegi){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL de mise à jour du menu avec des paramètres
    $sql = "insert into Movie(name, director, year, length, description, id_category, image, trailer, min_age) values(:name, :real, :annee, :length, :description, :categorie, :image, :trailer, :pegi)";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie les paramètres aux valeurs


    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':real', $real);
    $stmt->bindParam(':annee', $annee);
    $stmt->bindParam(':length', $length);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':pegi', $pegi);


    // Exécute la requête SQL
    $stmt->execute();
    // Récupère le nombre de lignes affectées par la requête
    $res = $stmt->rowCount();
    return $res; // Retourne le nombre de lignes affectées
}

function getMovieDetailById($id){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer les informations du film en fonction du nom
    $sql = "SELECT Movie.id, Movie.name, image, description, director, year, length, Category.name AS category_name, min_age, trailer FROM Movie INNER JOIN Category ON Movie.id_category = Category.id WHERE Movie.id = :id";
    // Préparation de la requête SQL
    $stmt = $cnx->prepare($sql);
    // Liaison du paramètre :id avec la variable $id
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    // Exécution de la requête
    $stmt->execute(); 
    // Conversion des lignes récupérées en tableau d'objets (chaque ligne devient un objet)
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getMoviesByCategory() {
    try {
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        $sql = "SELECT 
                    Category.id AS category_id, 
                    Category.name AS category_name, 
                    Movie.id AS movie_id, 
                    Movie.name AS movie_name, 
                    Movie.image AS movie_image, 
                    Movie.min_age AS movie_min_age
                FROM Movie
                JOIN Category ON Movie.id_category = Category.id
                ORDER BY Category.name, Movie.name";
        $stmt = $cnx->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $categories = [];
        foreach ($rows as $row) {
            if (!isset($categories[$row->category_id])) {
                $categories[$row->category_id] = [
                    "name" => $row->category_name,
                    "movies" => []
                ];
            }
            $categories[$row->category_id]["movies"][] = [
                "id" => $row->movie_id,
                "name" => $row->movie_name,
                "image" => $row->movie_image,
                "min_age" => $row->movie_min_age
            ];
        }
        return array_values($categories);
    } catch (Exception $e) {
        error_log("Erreur SQL : " . $e->getMessage());
        return false;
    }
}

function addUser($name, $image, $datenaissance) {
    try {
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
        $sql = "INSERT INTO UserProfile (name, image, datenaissance) 
                VALUES (:name, :image, :datenaissance)";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':image', $image);
        $stmt->bindParam(':datenaissance', $datenaissance);
        $stmt->execute();
        return $stmt->rowCount();
    } catch (PDOException $e) {
        error_log("Erreur SQL : " . $e->getMessage());
        return false;
    }
}

function checkUser($name) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT COUNT(*) FROM UserProfile WHERE name = :name";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    return $count > 0; // retourne true si au moins un utilisateur existe avec ce nom
}

function getProfile(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT id, name, image, datenaissance FROM UserProfile";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}
function updateProfile($name, $image, $datenaissance, $id) {
 
    
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    
    $sql = "UPDATE UserProfile
            SET name = :name, image = :image, datenaissance = :datenaissance 
            WHERE id = :id";
    
    $stmt = $cnx->prepare($sql);
   
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':datenaissance', $datenaissance);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    $res = $stmt->rowCount(); 
    return $res; 
}
function addFavoris($id_movie, $id_profile) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL d'insertion dans la table Favoris
    $sql = "INSERT INTO Favoris (id_movie, id_profile) 
            VALUES (:id_movie, :id_profile)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_movie', $id_movie, PDO::PARAM_INT);
    $stmt->bindParam(':id_profile', $id_profile, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}


function delFavoris($id_movie, $id_profile) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour la suppression
    $sql = "DELETE FROM Favoris 
            WHERE id_movie = :id_movie 
            AND id_profile = :id_profile";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_movie', $id_movie, PDO::PARAM_INT);
    $stmt->bindParam(':id_profile', $id_profile, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}




function getFavoris($id_profile) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    // Requête SQL corrigée avec le bon paramètre
    $sql = "SELECT Movie.id, Movie.name, Movie.image, Category.name AS category
          FROM Favoris
          JOIN Movie ON Favoris.id_movie = Movie.id
          LEFT JOIN Category ON Movie.id_category = Category.id
          WHERE Favoris.id_profile = :id_profile"; // Utilisation cohérente de :id_profile
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_profile', $id_profile, PDO::PARAM_INT); // Correspondance avec la requête SQL
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $res;
}







function getLikes($id_profile) {
    try {
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, $options);
        
        $sql = "SELECT id_movie
                FROM Favoris
                WHERE Favoris.id_profile = :id_profile";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':id_profile', $id_profile, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    } catch (PDOException $e) {
        error_log("Erreur dans getLikes : " . $e->getMessage());
        return [];
    }
}