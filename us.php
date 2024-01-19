<?php
/*функция отладки*/
function debug($data, $die = false){
    echo "<pre>" . print_r($data, 1) . "</pre>";
    if($die){
        die;
    }
}
//debug($_POST,true);

$first_name = $_POST['f_name'];
$surname = $_POST['l_name']; 
$email = $_POST['email'];
$phone = $_POST['cc'] . $_POST['phone'];
$campaign = 'Leumi'; 
$token = 'FB'; 
$cntry = 'il';

$body = array(
    'firstname' => $first_name,
    'lastname' => $surname,
    'email' => $email,
    'phone' => $phone, 
    'affiliation' => $campaign,
    'source' => $token,
    'country' => $cntry,
  );
    //post registration
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://crm4.hopegroup.capital/api/margot',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($body),
        CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'X-AUTH-TOKEN: 3rmr-y2aO2qvWCEoZ6fgQM6aDrHlCXK2e3Zenms82Fmra!anJBZwWWVtx-ZEkbyleaSWA3wcISBK36hTUgVP/Oq-gfqD/63DudvZyOLuUw3n!aPTPx/MczTywLX=pAdo'
  ),
 ));
    
$response = curl_exec($curl);
curl_close($curl);
header('Location: sps/success.html');

?>
<html>
<head>
<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<?=$_COOKIE['fbpixel']?>&ev=Lead&noscript=1"/>
</head>
<body>
</body>
</html>
