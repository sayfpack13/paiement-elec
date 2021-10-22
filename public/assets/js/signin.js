document.getElementById("site-name").innerHTML=site_name;

function signin(){
	var user=document.getElementById("username").value;
	var pass=document.getElementById("password").value;

	if(user=="" || pass==""){
		error_msg("Username/password cannot be empty !!");
		return;
	}
	

	xmlRequest(site_url+"signin?api_key="+api_key+"&username="+user+"&password="+pass,(response)=>{
		try{
			var user=JSON.parse(response);
			sessionStorage.setItem("user",response);

			// load user header and redirect
			alert("welcome "+user["first name"]);
		}catch(e){
			error_msg(response);
			return;
		}
	});
}