<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $leadData = array(
        "email" => $_POST['email'],
        "phone" => $_POST['phone'],
        "firstname" => $_POST['f_name'],
        "lastname" => $_POST['l_name'],
        "fullname" => $_POST['f_name'] . ' ' . $_POST['l_name'],
        "country" => $_POST['country1'], // Add country field if available in your form
        "utm_campaign" => "LandingPage1",
        "comment" => $_POST['comment'],
        "info" => "info"
    );

    $apiUrl = 'https://api.sparklx.net/affiliates/leads';
    $apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhZmZpbGlhdGVfaWQiOjksImNyZWF0ZWQiOjE3MDU1OTU0MjUsImV4cGlyYXRpb24iOjAsImJyYW5kIjoic3BhcmtseCIsInJpZ2h0cyI6WyJhZmZpbGlhdGUiXX0.fsSw3ps-A7nY4cpHts_velX8iW2MCGgInDvzmrNbPFU'; // Replace with your actual API token

    $jsonData = json_encode(array("leads" => array($leadData)));

    $headers = array(
        'Authorization: ' . $apiToken,
        'Content-Type: application/json'
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    if ($httpCode == 200) {
        // Successful API call
        $obj = json_decode($response, true);
    
        // Redirect to success page
        header('Location: success.html');
        exit();
    } else {
        // Failed API call
        // Handle the error accordingly
        echo 'API call failed with HTTP code: ' . $httpCode;
    }
}
?>
