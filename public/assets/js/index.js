// init web settings
var container;

const site_url="http://"+window.location.host+"/";
const api_key="sayfpack";
var site_name="";
var site_description="";
var maintenance=false;




function init_container(){
	xmlRequest(site_url+"site_settings?api_key="+api_key,(response)=>{
		sessionStorage.setItem("site_settings",response);
		try{
			var site_settings=JSON.parse(response);
			site_name=site_settings.site_name;
			site_description=site_settings.site_description;
			maintenance=site_settings.maintenance;
		}catch(e){
			console.log(response);
		}

	})





	// load header
    var header=document.getElementById("header");

	// check if user is logged in
	if(sessionStorage.getItem("user")!=undefined)
		loadPage(header,"user/header.html");
	// if not logged in load normal header
	loadPage(header,"header.html");
    


	container=document.getElementById("container");
	// load home page
	loadPage(container,"home.html");



	
	// check for maintenance
	if(maintenance)
		loadPage(container,"maintenance.html");
}

function reset_btns(){

	var buttons=document.querySelector(".navbar").getElementsByTagName("button");
	for (var btn of buttons){
		btn.className=btn.className.replace(" active","");
	}
}
function load(Element,page){
	reset_btns();
	loadPage(container,page);
	Element.className+=" active";
}




