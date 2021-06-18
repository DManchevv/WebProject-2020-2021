<?php
    require_once "dbTable.php";

    $errors = [];
    $response = [];
    if (isset($_POST)) {
        $data = json_decode($_POST["data"], true);
        
        $db = new TableDatabase();

        //print_r($data);
        foreach ($data as $element) {
            //print_r($element);
            $query = $db->saveTable($element);
            if (!$query["success"]) {
                $errors[] = $query;
            }
        }
        /*$query = $db->saveTable($data);
        if (!$query["success"]) {
            $errors[] = $query;
        }*/
    } else {
        $errors[] = 'Invalid request';
    }

    if($errors) {
        $response = ['success' => false, 'data' => $errors];
    } else {
        $response = ['success' => true];
    }

    echo json_encode($response);
?>