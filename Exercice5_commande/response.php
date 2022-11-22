<?php
    $id = $_POST["id"];
	$date = $_POST["date"];
	$name = $_POST["name"];
	$adresse = $_POST["adresse"];
	$cp = $_POST["cp"];
	$ville = $_POST["ville"];
    $produits = $_POST["produits"];

    echo "Les données ont bien été envoyées !";
    echo "$id+' '+$date+' '+$name+' '+$adresse+' '+$cp+' '+$ville+' '+$produits";

?>
