<?php
    require_once "dbTable.php";

    $errors = [];
    $response = [];
    if (isset($_POST)) {
        //print_r($_POST);
        $id = json_decode($_POST["data"], true);
        
        //print_r($id);
        
        $db = new TableDatabase();

        $query = $db->getTableByID($id);
        if ($query["success"]) {
            $data = $query["data"]->fetch(PDO::FETCH_ASSOC);
            if (!$data) {
                $response = ["success" => true, "data" => false];
            } else {
                //print_r($data);
                $response = ["success" => true, "data" => $data];
            }
        } else {
            $response = ["success" => false, "data" => $query["error"]->fetch(PDO::FETCH_ASSOC)];
        }
    }
    
    echo json_encode($response);
?>