<?php

require_once "Mail.php";

$from = "The Boris <boris@the-boris.com>";
$fromadmin = "The Boris <boris.testov@gmail.com>";
$php_name = $_POST['ajax_name'];
$to = $_POST['ajax_email'];
$php_message = $_POST['ajax_message'];
$php_subject = $_POST['ajax_subject'];

$to = filter_var($to, FILTER_SANITIZE_EMAIL);


//After sanitization Validation is performed
if (filter_var($to, FILTER_VALIDATE_EMAIL)) {
$subject = "Message from contact form";
$body = "Hello, {$php_name}!\n\nThis is an automated message from the-boris.com.\n"
."Thank you for contacting me! I received your message and will reply ASAP. \n\n"
."Have a nice day,\n"
."Boris\n\n\n"
."---\n"
."Sender: {$to}\n"
."Name: {$php_name}\n"
."Subject: {$php_subject}\n"
."Message: {$php_message}\n"
."---\n";
$host = "the-boris.com";

$username = "boris@the-boris.com";

$password = "TheB0risP@55";

$headers = array ('From' => $from,
'To' => $to,
'Subject' => $subject);
$smtp = Mail::factory('smtp',
array ('host' => $host,
'port' => 26,
'auth' => "PLAIN",
'username' => $username,
'password' => $password));
$mail = $smtp->send($to, $headers, $body);
if (PEAR::isError($mail)) {
echo("<p>" . $mail->getMessage() . "</p>");
}

$headers = array ('From' => $from,
'To' => $fromadmin,
'Subject' => $subject);

$body = "Hello, Boris!\n\nYou have a new message at the-boris.com. \n\n"
."Have a nice day,\n"
."Boris\n\n\n"
."---\n"
."Sender: {$to}\n"
."Name: {$php_name}\n"
."Subject: {$php_subject}\n"
."Message: {$php_message}\n"
."---\n";

$smtp = Mail::factory('smtp',
array ('host' => $host,
'port' => 26,
'auth' => "PLAIN",
'username' => $username,
'password' => $password));
$mail = $smtp->send($fromadmin, $headers, $body);
if (PEAR::isError($mail)) {
echo("<p>" . $mail->getMessage() . "</p>");
}
}

?>
