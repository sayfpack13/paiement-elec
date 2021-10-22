const express=require("express")
const path=require("path")
const mysql=require("mysql")
const app=express()

const host="localhost"
const port=8080
var site_settings={};
const      pool=mysql.createPool({
    host     : 'remotemysql.com',
    port     :  3306,
    user     : 'p9N3diyQi3',
    password : '9JUBw3qtNo',
    database : 'p9N3diyQi3',
})




init()

function init(){
 
    pool.getConnection((err,conn)=>{
        pool.query("select * from settings;",(err,rows)=>{

            site_settings=rows[0]
        })
    })

    // website pages
const webPath=path.join(__dirname,"/public")
app.use(express.static(webPath))


app.listen(port,()=>{
    console.log('Connected to port '+port)
})
}








app.get("/site_settings",(req,ses)=>{
    ses.write(JSON.stringify(site_settings))
    ses.end()
})



app.get("/signin",(req,ses)=>{
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



/*
function get_xmlRequest(path,callback){
    app.get(path,(req,ses)=>{
        if(check_api(req)){
             callback(req,ses);
        }else{
            ses.write("Wrong API KEY !!");
            ses.end()
        }
       
    })
    
}

function check_api(req){
    if(req.query.api_key!=site_settings.api_key)
    return false
    else
    return true
}
*/

