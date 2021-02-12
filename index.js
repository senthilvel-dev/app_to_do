var express = require ('express');
var app = express();
var fs = require('fs');
const jwt = require('njwt');
const claims ={Name:'Vel'};
const token = jwt.create(claims,'Secret-key');
const {Client} = require('pg');
var Excel = require('exceljs');
var wb = new Excel.Workbook();
const client = new Client(process.env.db_conn);
client.connect(function(err)
{
   if(err) {console.log(err);
   }
});
app.get('/',function(req,res){
res.send('Server is running');
})
app.get('/insert',function(req,res){
    wb.xlsx.readFile('E:/book2.xlsx').then(function(){
        try {
             var sh = wb.getWorksheet('Sheet1');
             const query = 
               {
                   text:'insert into checkin (name,role,macro) values($1,$2,$3)',
                   values:sh.getRow(1).values
               }
            client.query(query,(res) =>{
            console.log(res);
            client.end();
            })
    
        }
        catch(err)
        {
            console.log(err);
        }
    })
    res.send('inserted',token);
})
var server= app.listen(8080,function(){
    var host= server.address().address;
    var port=server.address().port;
    console.log('Done');
})