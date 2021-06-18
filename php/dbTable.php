<?php
    class TableDatabase {
        private $connection;
        private $insertTable;
        private $truncateTable;
        private $selectTable;
        private $selectCellByID;

        public function __construct() {
            $type = "mysql";
            $host = "localhost";
            $name = "webproject";
            $user = "root";
            $pass = "";

            $this->init($type, $host, $name, $user, $pass);
        }

        private function init($type, $host, $name, $user, $password) {
            try {
                $this->connection = new PDO("$type:host=$host;dbname=$name", $user, $password,
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

                $this->prepareStatements();
            } catch(PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }

        private function prepareStatements() {
            /*$sql = "INSERT INTO documenttable (id, class, data, owner) VALUES (:id, :class, :data, NULL)";*/
            $sql = "INSERT INTO documenttable (id, class, innervalue) VALUES (:id, :class, :innervalue)";
            $this->insertTable = $this->connection->prepare($sql);

            $sql = "TRUNCATE webtech_project.documenttable";
            $this->truncateTable = $this->connection->prepare($sql);

            $sql = "SELECT * FROM documenttable";
            $this->selectTable = $this->connection->prepare($sql);

            $sql = "SELECT * FROM documenttable WHERE id = :id";
            $this->selectCellByID = $this->connection->prepare($sql);
        }

        public function saveTable($data) {

            try {
                $this->insertTable->execute($data);
                return ["success" => true];
            } catch(PDOException $e) {
                $this->connection->rollBack();

                return ["success" => false, "error" => "Connection failed: ". $e->getMessage()];
            }
        }

        public function getSavedTableInfo() {
            try {
                $this->selectTable->execute();
                return ["success" => true, "data" => $this->selectTable];
            } catch (PDOException $e) {
                return ["success" => false, "error" => "Connection failed while receiving table data: " . $e->getMessage()];
            }
        }

        public function emptyTable() {
            try {
                $this->truncateTable->execute();
                return ["success" => true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => "Connection failed: " . $e->getMessage()];
            }
        }

        public function getTableByID($data) {
            try {
                $this->selectCellByID->execute($data);
                return ["success" => true, "data" => $this->selectCellByID];
            } catch (PDOException $e) {
                return ["success" => false, "error" => "Connection failed: " . $e->getMessage()];
            }
        }

        function __destruct() {
            $this->connection = null;
        }
    }
?>