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
  // remove react DOM components
  ReactDOM.unmountComponentAtNode(container)

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

// Jquery PAGE LOADER
function loadPage2(container,page){
  $(container).load(page);
  loadJSFiles(container);
}



function loadJSFiles(container){
	var scripts=container.getElementsByTagName("script");
	

  var head_scripts=document.head.getElementsByTagName("script");
  var head_scripts_src=[];

for(script of head_scripts){
  head_scripts_src.push(script.src);
}

	for (var script of scripts){
    // if scripts exist remove it so we can re-add it later
    if(head_scripts_src.includes(script.src)){
      head_scripts[head_scripts_src.indexOf(script.src)].remove();
    }

  
		var n_script=document.createElement("script");
    if(script.type!="")
      n_script.type=script.type;
      
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