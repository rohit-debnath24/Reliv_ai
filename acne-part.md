<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Acne Analysis System</title>

<!-- QR -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

<!-- Supabase (Stable CDN) -->
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>

<style>

body{
margin:0;
font-family:Arial,Helvetica,sans-serif;
background:linear-gradient(135deg,#667eea,#764ba2);
min-height:100vh;
}

.desktop{padding:20px;}

.box{
max-width:700px;
margin:auto;
background:white;
padding:30px;
border-radius:20px;
box-shadow:0 0 20px rgba(0,0,0,.3);
}

h1{text-align:center;color:#667eea;}

.center{text-align:center;}

.btn{
width:100%;
padding:14px;
border:none;
border-radius:10px;
background:#667eea;
color:white;
font-size:17px;
cursor:pointer;
margin-top:10px;
}

.btn:hover{background:#5568d3}

.hidden{display:none}

#qrcode{margin:20px auto;width:256px;}

#photoResult{
width:100%;
border-radius:10px;
margin-top:20px;
}

/* Mobile */

.mobile{
background:black;
color:white;
min-height:100vh;
display:flex;
flex-direction:column;
}

.header{
background:#667eea;
padding:15px;
text-align:center;
}

.video-box{flex:1;}

video{
width:100%;
height:100%;
object-fit:cover;
}

.controls{
padding:20px;
background:#111;
}

#preview,#successPreview{
width:90%;
border-radius:15px;
margin:20px auto;
display:block;
}

canvas{display:none}

</style>
</head>


<body>

<!-- ================= DESKTOP ================= -->

<div id="desktop" class="desktop">

<div class="box">

<h1>🔬 Acne Analysis</h1>

<div id="start" class="center">

<p>Click to start</p>

<button class="btn" onclick="generateQR()">
Generate QR
</button>

</div>


<div id="qrBox" class="hidden center">

<h3>Scan QR</h3>

<div id="qrcode"></div>

<p id="mobileLink"></p>

<p>Waiting...</p>

</div>


<div id="result" class="hidden center">

<h3>Received</h3>

<img id="photoResult">

<p id="status">Analyzing...</p>

<button class="btn" onclick="reset()">
New
</button>

</div>

</div>

</div>


<!-- ================= MOBILE ================= -->

<div id="mobile" class="mobile hidden">

<div class="header">
<h2>📷 Camera</h2>
</div>


<div id="perm" class="center" style="padding:40px">

<button class="btn" onclick="requestCamera()">
Enable Camera
</button>

</div>


<div id="camera" class="hidden">

<div class="video-box">
<video id="video" autoplay playsinline></video>
</div>

<div class="controls">
<button class="btn" onclick="capture()">
Capture
</button>
</div>

</div>


<div id="previewBox" class="hidden center">

<h3>Preview</h3>

<img id="preview">

<button class="btn" onclick="upload()">
Upload
</button>

<button class="btn" style="background:#666" onclick="retake()">
Retake
</button>

</div>


<div id="success" class="hidden center" style="padding:40px">

<h3>Uploaded</h3>

<img id="successPreview">

</div>

</div>


<canvas id="canvas"></canvas>


<script>

/* ========== SUPABASE CONFIG ========== */

const SUPABASE_URL =
"https://qxjypojaepopsugxazdx.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4anlwb2phZXBvcHN1Z3hhemR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MDQ0MzAsImV4cCI6MjA4NTE4MDQzMH0.AC4o9gYjFvQWl50zRB_II6nxdsvETkETqFm5-PKCAyY";


/* Create client safely */
const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* ========== GLOBAL ========== */

let sessionId=null;
let stream=null;
let photo=null;
let poll=null;


/* ========== MODE ========== */

const p=new URLSearchParams(location.search);

if(p.get("mode")==="mobile"){

document.getElementById("desktop").classList.add("hidden");
document.getElementById("mobile").classList.remove("hidden");

sessionId=p.get("session");

}


/* ========== DESKTOP ========== */

function generateQR(){

sessionId="s_"+Date.now()+Math.random().toString(36).slice(2);

const url=
location.origin+
location.pathname+
`?mode=mobile&session=${sessionId}`;

document.getElementById("mobileLink").textContent=url;

document.getElementById("qrcode").innerHTML="";

new QRCode("qrcode",{
text:url,
width:256,
height:256
});

document.getElementById("start").classList.add("hidden");
document.getElementById("qrBox").classList.remove("hidden");

startPolling();

}


function startPolling(){

poll=setInterval(async()=>{

const {data,error}=await sb
.from("sessions")
.select("photo")
.eq("id",sessionId)
.single();

if(data && data.photo){

clearInterval(poll);

showPhoto(data.photo);

}

},1500);

}


function showPhoto(p){

document.getElementById("qrBox").classList.add("hidden");
document.getElementById("result").classList.remove("hidden");

document.getElementById("photoResult").src=p;

setTimeout(()=>{
document.getElementById("status").textContent="Done";
},1500);

}


function reset(){

if(poll) clearInterval(poll);

sessionId=null;

document.getElementById("start").classList.remove("hidden");
document.getElementById("qrBox").classList.add("hidden");
document.getElementById("result").classList.add("hidden");

}


/* ========== MOBILE ========== */

async function requestCamera(){

try{

stream=await navigator.mediaDevices.getUserMedia({
video:{facingMode:"user"},
audio:false
});

const v=document.getElementById("video");
v.srcObject=stream;

document.getElementById("perm").classList.add("hidden");
document.getElementById("camera").classList.remove("hidden");

}catch{
alert("Camera blocked");
}

}


function capture(){

const v=document.getElementById("video");
const c=document.getElementById("canvas");

c.width=v.videoWidth;
c.height=v.videoHeight;

c.getContext("2d").drawImage(v,0,0);

photo=c.toDataURL("image/jpeg",0.8);

document.getElementById("preview").src=photo;

stream.getTracks().forEach(t=>t.stop());

document.getElementById("camera").classList.add("hidden");
document.getElementById("previewBox").classList.remove("hidden");

}


function retake(){

photo=null;

document.getElementById("previewBox").classList.add("hidden");
document.getElementById("perm").classList.remove("hidden");

}


async function upload(){

if(!photo || !sessionId){
alert("Error");
return;
}

await sb
.from("sessions")
.upsert({
id:sessionId,
photo:photo
});


document.getElementById("previewBox").classList.add("hidden");
document.getElementById("success").classList.remove("hidden");

document.getElementById("successPreview").src=photo;

}

</script>

</body>
</html>
