window.onload = function() {
    var req = new XMLHttpRequest();

    document.getElementById("button").onclick = function() {
        post(req);
        console.log("click");
    };
    window.document.onkeydown = function(event){
        if (event.key === 'Enter') {
            post(req);
            console.log("Enter");
        };
    };

    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            var result = document.getElementById("result");
            result.textContent = decodeURI(req.responseText);
        };
    };
};

function post(req) {
    req.open("POST", "http://localhost:3000");
    req.send(document.getElementById("quely").value);
};