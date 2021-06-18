conn = new WebSocket(uri);
conn.onopen = function(e) {
    console.log(e);
    setOnline();
    console.log("Connected");
    isConnected = true;
};

conn.onclose = function(e) {
    console.log("Disconnected");
    setOffline();
};

conn.onmessage = function (e) {
    $("#chatTarget").prepend("Not me: " + e.data + "<br/>");
};

function send() {
    msg = $("#message").val();
    
    if (msg == "") {
        alert("Can't send an empty message");
        return;
    }
    conn.send(msg);
    $("#chatTarget").prepend("Me: " + msg + "<br/>");
    $("#message").val("");
}