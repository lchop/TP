const fs = require('fs');
const dayjs = require('dayjs');
const pug = require('pug');
const http = require('http');

const students = [
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
            try {
                const renderTemplate = pug.compileFile(`./view/template/layout.pug`,  { pretty: true });
                const result = renderTemplate({
                    title: 'Search Hacker News',
                    });
                console.log(result);
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


const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
});