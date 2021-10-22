function xmlRequest(url,callback) {
  const request=new XMLHttpRequest();

	
  request.open("GET", url, true);      // set the request

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


  request.send();

  
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      callback(request.responseText);
    }
  }
}




// PAGE LODER
function loadPage(container,page)
{
  const xmlhttp=new XMLHttpRequest();


  
   xmlhttp.onreadystatechange=function()
   {
     if (xmlhttp.readyState==4 && xmlhttp.status==200)
     {
       container.innerHTML=xmlhttp.responseText;
       // load js after page loaded
	   loadJSFiles(container);
     }
   }
   xmlhttp.open("GET",page,true);
   xmlhttp.send();
}

function loadJSFiles(container){
	var scripts=container.getElementsByTagName("script");
	
	for (var script of scripts){
		var n_script=document.createElement("script");
		n_script.src=script.src;
		document.head.appendChild(n_script);
		eval(n_script);
		script.remove();
	}

	// add ripple effect
	init_ripple();
}




// RIPPLE Button
function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

function init_ripple(){
var buttons = document.getElementsByClassName("ripple-btn");
for (const button of buttons) {
	button.addEventListener("click", createRipple);
}
}



// ERROR MESSAGE HANDLER
function error_msg(msg){
  var error_container=document.querySelector(".error-container");

  error_container.innerHTML=msg;
  error_container.style.display="block";
}




function logout(){
  localStorage.clear();
  loadPage(header,"header.html");
  loadPage(container,"home.html");
}