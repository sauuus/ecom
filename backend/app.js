// // core modules => fs, setTimeout
// // async => http

// //importing http modules
// const http = require('http');

// //importing fs module
// const fs = require('fs');

// //create the requestListener for the server
// function requestListener(request, response) {
//   const url = request.url;
//   const method = request.method;

//   if(url === '/') {
//     const data = fs.readFileSync('./message.txt');
//     const message = data.toString();

//     response.write(`
//     <h1>Your Message is: ${message}</h1>  
//     <h1>Enter Message</h1>
//       <form action="/message" method="POST"><input type="text" name="message" /><input type="submit" /></form>
//     `);
//     return response.end();
//   }
//   if(url === '/message' && method === 'POST') {
//    //parsing the incoming data
//    //stream and buffers
//    const body = [];
//    //event driven architecture..
//    request.on('data', (chunk) => {
//     body.push(chunk);
//     // console.log(chunk);
//    });

//    return request.on('end', () => {
//     const parsedBody = Buffer.concat(body).toString();
//     console.log(parsedBody);
//     const message = parsedBody.split('=')[1];
//     fs.writeFileSync('message.txt', message);
//     response.statusCode = 302;
//     response.setHeader('Location', '/');
//     return response.end();
//    });
//   }

//   response.setHeader('Content-type', 'text/html');
//   response.write('<h1>Hello from the server</h1>');
//   return response.end();

//   // application hard exit
//   process.exit();
// }

// //creating server using http
// const server = http.createServer(requestListener);

// //process,env,PORT
// //listen to port 8080
// server.listen(8080, () => {
//   console.log('listening in port 8080');
// });