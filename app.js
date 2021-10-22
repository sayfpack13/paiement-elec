const express=require("express")
const path=require("path")
const mysql=require("mysql")
const app=express()

const host="localhost"
const port=8080
var site_settings={};
var pool;

// used for temp usage
var object={};
var msg="";


init()

function init(){
    // mysql
     pool=mysql.createPool({
        host:host,
        user:"root",
        password:"",
        database:"cloudy"
    })
 
    pool.getConnection((err,conn)=>{
        if(err) throw err
        conn.query("select * from settings;",(err,rows)=>{
            conn.release()
            
            if(!err){
                site_settings=rows[0];
            }
        })
    })

    // website pages
const webPath=path.join(__dirname,"/public")
app.use(express.static(webPath))


app.listen(port,()=>{
    console.log('Connected to port '+port)
})
}








get_xmlRequest("/site_settings",(req,ses)=>{
    ses.write(JSON.stringify(site_settings))
})



get_xmlRequest("/signin",(req,ses)=>{
    var username=req.query.username;
    var password=req.query.password;

    pool.query("select * from users where username like ?",username,(err,rows)=>{

            
        if(rows.length==0){
            ses.write("Account doesn't exist !!")
            ses.end();
        }else{
            pool.query("select * from users where username like ? and password like ?",[username,password],(err,rows)=>{
                if(rows.length==0){
                    ses.write("Wrong password !!")
                }else{
                    ses.write(JSON.stringify(rows[0]));
                }
                ses.end();
            })
            
        }
        
})

    
})




function get_xmlRequest(path,callback){
    app.get(path,(req,ses)=>{
        if(check_api(req)){
             callback(req,ses);
        }else{
            ses.write("Wrong API KEY !!");
        }
       
    })
    
}

function check_api(req){
    if(req.query.api_key!=site_settings.api_key)
    return false
    else
    return true
}

