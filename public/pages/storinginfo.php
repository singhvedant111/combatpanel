<?php
session_start();
include("../includes/db.php");

if(isset($_POST['push'])){
    $name = $_POST['inputName'];
    $mobile = $_POST['mobile'];
    $password = $_POST['password'];
    
    $data = [
        'name' => $name,
        'mobile' => $mobile,
        'password' => $password
    ];
    $ref = "candidates/";
    $pushData = $database->getReference($ref)->push($data);
    echo "wow";
    //header("Location:index.php?action=successinformationupdate");
}
else{
    $name = $_POST['inputName'];
    $mobile = $_POST['mobile'];
    $password = $_POST['password'];
    
    $data = [
        'name' => $name,
        'mobile' => $mobile,
        'password' => $password
    ];
    $ref = "candidates/";
    $pushData = $database->getReference($ref)->push($data);
    echo "wow";
    //header("Location:index.php?action=successinformationupdate");
}


?>