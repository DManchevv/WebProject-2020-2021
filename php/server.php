<?php
// using Ratchet library
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use WebProject\OnlineTable;

    // include these core files
    require dirname(__DIR__) . '/vendor/autoload.php';
    require dirname(__DIR__) . '/php/ServerHandler.php';

    // server listening to any IP on port 8090
    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new OnlineTable()
            )
            ),
            8090
    );

    // starting the server
    $server->run();
?>