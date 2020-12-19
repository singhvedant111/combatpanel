
<?php

require __DIR__.'/vendor/autoload.php';

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Auth;

// This assumes that you have placed the Firebase credentials in the same directory
// as this PHP file.
$serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/cp-em-36847-firebase-adminsdk-py4id-982dc0b7af.json');
$firebase = (new Factory)
    ->withServiceAccount($serviceAccount)
    // The following line is optional if the project id in your credentials file
    // is identical to the subdomain of your Firebase project. If you need it,
    // make sure to replace the URL with the URL of your project.
    ->withDatabaseUri('https://facerecog-7864e.firebaseio.com/')
    ->create();
$database = $firebase->getDatabase();
//$firebase2 = (new Factory)->withServiceAccount($serviceAccount)->create();
$auth= $firebase->getAuth();


?>