const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url==="/")
    {
        res.setHeader("Content-Type","text/html");
        var x;
       
       
        fs.readFile('message.txt',{ encoding:"utf-8" },(err,data) =>{
           
            x=data;
            if(err)
            {
                console.log(err);
            }
        })
        

        res.write(
            `
            <!doctype html>
            <html>
            <head>
            <title>File System Practise</title>
            </head>
            
            <body>
            ${x}
            </body>
            <body>
            <form action="/message" method="post">
            <div>
            <label>Name : </label>
            <input type="text" name="name"/>
            <input type="submit" value="Submit"/>
            
            </div>
            <div>
            
            </div>
            </form>
            </body>
            </html>
            `
        )
        
        return res.end();
    }    
    else if(url==="/message" && method=== 'POST')
    {
        const body = [];
        req.on('data',(chunk) => {
            body.push(chunk);
        });

        return req.on('end',() => {
            const requestBody = Buffer.concat(body).toString();
            const message = requestBody.split('=')[1];
            fs.writeFile('message.txt',message,(err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();

            });

        });

        
    }
    else
    {

    }
}
module.exports = requestHandler;

//exports=requestHandler;
//module.exports.handler=requestHandler;