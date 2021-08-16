<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

    if ($_POST) {

        $mail = new PHPMailer;
        $mail->CharSet = 'utf-8';

        // calc
        $season = $_POST['season'];
        $distance = $_POST['distance'];
        $wait = $_POST['wait'];
        $wait_time = $_POST['wait_time'];
        $quantity = $_POST['quantity'];
        $childs_availible = $_POST['childs_availible'];
        $child_quantity = $_POST['child_quantity'];
        $child_age1 = $_POST['child_age1'];
        $child_age2 = $_POST['child_age2'];
        $child_age3 = $_POST['child_age3'];
        $price_total = $_POST['price_total'];
        $city_from = $_POST['city_from'];
        $city_to = $_POST['city_to'];

        // rent car
        $city = $_POST['city'];
        $quantity_days = $_POST['quantity_days'];

        // anonim question
        $question = $_POST['question'];

        // universal 
        $body = $_GET['body'];
        $customer_phone = $_POST['customer_phone'];
        $customer_name = $_POST['customer_name'];
        $template = $_POST['template'];

        if ($season === 'on') {
            $season = 'В период с октября по май';
        } else {
            $season = 'В период с июня по сентябрь';
        }

        if ($wait === 'on') {
            $wait = 'Нужно';
        } else {
            $wait = 'Не нужно';
        }

        if ($wait_time === '1') {
            $wait_time = $wait_time . ' час.';
        } elseif ($wait_time > 1 && $wait_time < 5) {
            $wait_time = $wait_time . ' часа.';
        } else {
            $wait_time = $wait_time . ' часов.';
        }

        if ($childs_availible === 'on') {
            $childs_availible = 'будут дети. Колличество: ' . $child_quantity . '. Возраст детей: ' . $child_age1 . ', ' . $child_age2 . ', ' . $child_age3 . '. ';
        } else {
            $childs_availible = 'не будет детей. ';
        }

        $mail->isSMTP();                                  
        $mail->Host = '*********';  		
        $mail->SMTPAuth = true; 

        $mail->Username = '*********'; // Ваш логин от почты с которой будут отправляться письма
        $mail->Password = '*********'; // Ваш пароль от почты с которой будут отправляться письма
        $mail->SMTPSecure = 'ssl';   
        $mail->Port = 587; 

        $mail->From = '*********'; // от кого будет уходить письмо?
        $mail->FromName = 'Site roadinspain.com';
        $mail->addAddress('*********');  // Кому будет уходить письмо 
        // //$mail->addAddress('ellen@example.com');               // Name is optional
        // //$mail->addReplyTo('info@example.com', 'Information');
        // //$mail->addCC('cc@example.com');
        // //$mail->addBCC('bcc@example.com');
        // //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        // //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(true); 



        switch ($template) {
            case 'calc':
                $mail->Subject = 'Заказ такси ' . $season;

                $mail->Body = $season . ' хотят заказать трансфер - <b>' . $quantity . ' человек </b>' . '<br>' . $wait . ' их будет ждать примерно ' . $wait_time . '<br> Им нужно будет проехать примерно: <b>' . $distance . 'км. </b>' . '<br> У них ' . $childs_availible . '<br> Калькулятор на сайте насчитал - <b>' . $price_total . 'евро. </b> <br><br> Город прилета: ' . $city_from . '<br> Место назначения: ' . $city_to . '<br> Телефон: ' . $customer_phone . '<br> Имя: ' . $customer_name . '<br><br>';


                $mail->AltBody = $season . ' хотят заказать трансфер - ' . $quantity . ' человек' .  $wait . ' их будет ждать' . $wait_time . 'Им нужно будет проехать примерно: ' . $distance . 'км. ' . 'У них ' . $childs_availible . 'Калькулятор на сайте насчитал - ' . $price_total . 'евро. Город прилета: ' . $city_from . ' Место назначения: ' . $city_to . ' Телефон: ' . $customer_phone . ' Имя: ' . $customer_name;
                break;

            case 'order_taxi':
                $mail->Subject = "Заявка на заказ трансфера!";
                $mail->Body = 'Неизвестное количество людей хочет заказать трансфер. <br> <b>Из ' . $city_from . ' в ' . $city_to . '</b> <br> Телефон: <a>' . $customer_phone . '</a><br> Имя: ' . $customer_name;

                $mail->AltBody = 'Неизвестное количество людей хочет заказать трансфер. Из ' . $city_from . ' в ' . $city_to . ' Телефон: ' . $customer_phone . ' Имя: ' . $customer_name;
                break;

            case 'rent_car':
                $mail->Subject = "Заявка на аренду авто!";

                $mail->Body = 'Есть желающие взять авто в аренду. <b>В городе: ' . $city . '</b>. <br> На срок около ' .$quantity_days . ' суток. <br><br> Их телефон: ' .  $customer_phone . '<br> Имя: ' . $customer_name;

                $mail->AltBody = 'Есть желающие взять авто в аренду. В городе: ' . $city . '. На срок около ' .$quantity_days . ' суток. Их телефон: ' .  $customer_phone . ' Имя: ' . $customer_name;
                break;
            
            case 'anonim_question':
                $mail->Subject = "Анонимный вопрос";

                $mail->Body = 'Вопрос от человека с этим номером телефона:' .  $customer_phone . '<br><br> <b>Текст: </b> ' . $question;

                $mail->AltBody = 'Вопрос от человека с этим номером телефона:' .  $customer_phone . 'Текст: ' . $question;
                break;
        }




        if($mail->send()) {
            echo 'Message sent!';
        } else {
            echo 'error: ' . $mail->ErrorInfo;
        }

    }
?>
