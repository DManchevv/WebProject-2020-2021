<?php
    require_once "dbTable.php";

    $errors = [];
    $response = [];
    if (isset($_POST)) {
        
        $db = new TableDatabase();

        //print_r($data);
        $emptyTableQuery = $db->emptyTable();
        if (!$emptyTableQuery["success"]) {
            $errors[] = $emptyTableQuery;
        }
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