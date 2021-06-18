<?php
    namespace MyApp;
    use Ratchet\MessageComponentInterface;
    use Ratchet\ConnectionInterface;

    class Chat implements MessageComponentInterface {
        protected $clients;
        protected $cells = array();
        protected $cellsCSS = array();
        protected $clientsIds = array();
        protected $rowsNumber = 30;
        protected $columnsNumber = 30;

        public function __construct() {
            $this->clients = new \SplObjectStorage;
            echo "Server started\n";
        }

        public function onOpen(ConnectionInterface $conn) {
            // Store the new connection to send messages to later
            $this->clients->attach($conn);

            $randomId = rand(1, 1000000000);

            $this->clientsIds[$conn->resourceId] = $randomId;

            $conn->send("jsonTable-" . json_encode($this->cells) . "-" . $this->rowsNumber . '-' . $this->columnsNumber . "-" . json_encode($this->cellsCSS));
            $conn->send("loadIcons-" . json_encode($this->clientsIds));


            foreach ($this->clients as $client) {
                if ($conn !== $client) {
                    // The sender is not the receiver, send to each client connected
                    $client->send("loadNewUserIcon-" . "user" . $randomId);
                }
            }

            echo "New connection! ({$conn->resourceId})\n";
        }

        public function onMessage(ConnectionInterface $from, $msg) {
            $numRecv = count($this->clients) - 1;

            $strings = explode("-", $msg);

            if ($strings[0] === "changeCell") {
                $this->cells[$strings[1]] = $strings[2];
            }

            if ($strings[0] === "insertRow") {
                $this->rowsNumber++;
            }

            if ($strings[0] === "insertColumn") {
                $this->columnsNumber++;
            }

            if ($strings[0] === "changeCSS") {
                $cssCode = "";
                for ($i = 2; $i < count($strings) ; $i++) {
                    $cssCode = $cssCode . $strings[$i];

                    if ($i != count($strings) - 1) {
                        $cssCode = $cssCode . "-";
                    }
                }

                $this->cellsCSS[$strings[1]] = $cssCode;
            }

            if ($strings[0] === "editServerCellsArray") {
                $this->cells[$strings[1]] = $strings[2];
            }
            else if ($strings[0] === "editServerCellsCSSArray") {
                $cssCode = "";

                for ($i = 2; $i < count($strings) ; $i++) {
                    $cssCode = $cssCode . $strings[$i];

                    if ($i != count($strings) - 1) {
                        $cssCode = $cssCode . "-";
                    }
                }

                $this->cellsCSS[$strings[1]] = $cssCode;
            }
            else {
                echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
                , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

                foreach ($this->clients as $client) {
                    if ($from !== $client) {
                        // The sender is not the receiver, send to each client connected
                        $client->send($msg);
                    }
                }
            }
        }

        public function onClose(ConnectionInterface $conn) {
            // The connection is closed, remove it, as we can no longer send it messages
            $this->clients->detach($conn);

            foreach ($this->clients as $client) {
                $client->send("removeIcon-" . "user" . $this->clientsIds[$conn->resourceId]);
            }

            unset($this->clientsIds[$conn->resourceId]);

            echo "Connection {$conn->resourceId} has disconnected\n";
        }

        public function onError(ConnectionInterface $conn, \Exception $e) {
            echo "An error has occurred: {$e->getMessage()}\n";

            $conn->close();
        }
    }
?>