const fs = require('fs');
const dayjs = require('dayjs');
const pug = require('pug');
const http = require('http');
require('dotenv').config({path : './config/.env'})

const menuItems = [
    { path: '/', title: 'Home', isActive: true },
    { path: '/delete', title: 'Delete', isActive: false },
];

let students = [
    { name : "Sonia", birth : formatDate("2019-14-05")},
    { name : "Antoine", birth :formatDate("2000-12-05")},
    { name : "Alice", birth : formatDate("1990-14-09")},
    { name : "Sophie", birth : formatDate("2001-10-02")},
    { name : "Bernard", birth : formatDate("1980-21-08")}
];

function formatDate(date){
    return dayjs(date).format('DD/MM/YYYY') 
}


const server = http.createServer();

server.on('request', (request,response) => {
    let url = request.url
    switch(url){
        case '/':
            if(request.method === 'POST'){
                let data = '';
                request.on('data', chunk => {
                    data+=chunk;
                });
                request.on('end', () => {
                    let dataSpit = data.split("&");
                    let name = dataSpit[0].split('=')[1];
                    let birth = dataSpit[1].split('=')[1];
                    if (birth !== '' && name !== '' && !students.find((student)=> student.name == name)){
                        students.push({name: name, birth:formatDate(birth)});
                    }
                    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                    response.end();
                });
            }
            try {
                const renderTemplate = pug.compileFile(`./view/template/layout.pug`,  { pretty: true });
                const result = renderTemplate({
                    title: 'Students list',
                    students,
                    menuItems
                    });
                response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                response.write(result);  

            } catch (error) {
                console.log(error);
                response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
                response.write('<h1>404 Not Found</h1>');
            }
            break;
        case '/delete':
            if(request.method === 'POST'){
                console.log('test');
                let data = '';
                request.on('data', chunk => {
                    data+=chunk;
                });
                request.on('end', () => {
                    let name = data.split('=')[1];
                    students = students.filter((item) => item.name != name);
                    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                    response.end();
                });
            }
            try {
                const renderTemplate = pug.compileFile(`./view/template/delete.pug`,  { pretty: true });
                const result = renderTemplate({
                    title: 'Delete student',
                    students,
                    menuItems
                    });
                response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                response.write(result);  

            } catch (error) {
                console.log(error);
                response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
                response.write('<h1>404 Not Found</h1>');
            }
            break;
        default:
            response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
            response.write('<h1>404 Not Found</h1>');
            break;
    }
    response.end();
});


server.listen(process.env.APP_PORT,process.env.APP_HOSTNAME,()=>{
    console.log(`Server running at http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`);
});