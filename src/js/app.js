'use strict';

var $ = jQuery.noConflict();
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000/60);
        };
})();

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

window.URL = window.URL ||
    window.webkitURL ||
    window.msURL ||
    window.mozURL;

var j;
function sendFrameLoop() {
    if (socket == null || socket.readyState != socket.OPEN ||
        !vidReady || numNulls != defaultNumNulls) {
        return;
    }

    if (tok > 0) {
        var canvas = document.createElement('canvas');
        canvas.width = vid.width;
        canvas.height = vid.height;
        var cc = canvas.getContext('2d');
        cc.drawImage(vid, 0, 0, vid.width, vid.height);
        var apx = cc.getImageData(0, 0, vid.width, vid.height);

        var dataURL = canvas.toDataURL('image/jpeg', 0.6)

        var frameType = 'FRAME'
        if (training) {
            frameType = 'TrainingFRAME'
        }
        var msg = {
            'type': frameType,
            'dataURL': dataURL,
            'identity': defaultPerson
        };
        socket.send(JSON.stringify(msg));
        tok--;
    }
    setTimeout(function() {requestAnimFrame(sendFrameLoop)}, 3000);
}


function updateRTT() {
    var diffs = [];
    for (var i = 5; i < defaultNumNulls; i++) {
        diffs.push(receivedTimes[i] - sentTimes[i]);
    }
    // $("#rtt-"+socketName).html(
    //     jStat.mean(diffs).toFixed(2) + " ms (σ = " +
    //         jStat.stdev(diffs).toFixed(2) + ")"
    // );
}

function sendState() {
    var msg = {
        'type': 'ALL_STATE',
        'images': images,
        'people': people,
        'training': training
    };
    socket.send(JSON.stringify(msg));
}

function createSocket(address, name) {
    socket = new WebSocket(address);
    socketName = name;
    socket.binaryType = "arraybuffer";
    socket.onopen = function() {
        $("#serverStatus").html("Connected to " + name);
        sentTimes = [];
        receivedTimes = [];
        tok = defaultTok;
        numNulls = 0

        socket.send(JSON.stringify({'type': 'NULL'}));
        sentTimes.push(new Date());
    }
    socket.onmessage = function(e) {
        // console.log(e.data);
        j = JSON.parse(e.data)
        if (j.type == "NULL") {
            receivedTimes.push(new Date());
            numNulls++;
            if (numNulls == defaultNumNulls) {
                updateRTT();
                sendState();
                sendFrameLoop();
                // console.timeEnd("startPage")
            } else {
                socket.send(JSON.stringify({'type': 'NULL'}));
                sentTimes.push(new Date());
            }
        } else if (j.type == "PROCESSED") {
            tok++;
        } else if (j.type == "DB_LIST") {
            // alert("DB_LIST: " + j.list.length);
            // console.log(j)
            var loopCnt = 0
            // console.time("addtimer")
            for (var i = 0; i < j.list.length; i++) {
                loopCnt++;
                var db_info = j.list[i];
                images.push({
                hash: db_info.hash,
                identity: db_info.identity,
                // image: getDataURLFromRGB(db_info.content),
                image: "/db_face/" + db_info.name + "/" + db_info.hash + ".jpg",
                representation: db_info.representation
                });
                people[db_info.identity] = db_info.name;
            };
            // console.timeEnd("addtimer")
            // console.log("loop times: %d, and images: %d", loopCnt, images.length)
            // console.timeEnd("redrawPeople")
        } else if (j.type == "NEW_IMAGE") {
            images.push({
                hash: j.hash,
                identity: j.identity,
                // image: getDataURLFromRGB(j.content),
                image: "/db_face/" + j.name + "/" + j.hash + ".jpg",
                representation: j.representation
            });
            people[j.identity] = j.name;
        } else if (j.type == "IDENTITIES") {
            var h = "Last updated: " + (new Date()).toTimeString();
            h += "<ul>";
            var len = j.identities.length
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var identity = "Unknown";
                    var idIdx = j.identities[i];
                    if (idIdx != -1) {
                        identity = people[idIdx];
                    }
                    h += "<li>" + identity + "</li>";
                }
            } else {
                h += "<li>Nobody detected.</li>";
            }
            h += "</ul>"
            if (typeof  identity != 'undefined'){

              $('.caras li img').removeClass('green');
              $('#'+ identity+' img').addClass('green');
            } else {
              $('.caras').closest('li').removeClass('green');
            }
            $("#peopleInVideo").html(h);
        } else if (j.type == "ANNOTATED") {
            $("#detectedFaces").html(
                "<img src='" + j['content'] + "' width='430px'></img>"
            )
        } else if (j.type == "TSNE_DATA") {
            BootstrapDialog.show({
                message: "<img src='" + j['content'] + "' width='100%'></img>"
            });
        } else {
            console.log("Unrecognized message type: " + j.type);
        }
    }
    socket.onerror = function(e) {
        // console.log("Error creating WebSocket connection to " + address);
        // console.log(e);
    }
    socket.onclose = function(e) {
        if (e.target == socket) {
            $("#serverStatus").html("Disconnected.");
        }
    }
}

function umSuccess(stream) {
    if (vid.mozCaptureStream) {
        vid.mozSrcObject = stream;
    } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream)) ||
            stream;
    }
    vid.play();
    vidReady = true;
    sendFrameLoop();
}


var watch = $("#watch1").slotMachine();

$("#slotMachineButtonPrev").click(function(){
  console.log('movida');
  watch.shuffle(20);
});

$("#slotMachineButtonNext").click(function(){
  watch.next();
});


//init waypoint para el destacado de restaurante
$(document).ready(function(){



});
