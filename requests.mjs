import {createServer} from 'node:http'
const PORT = 3000
const server = createServer((req,res)=>{

    const {method, url} = req;
    res.setHeader('Content-Type','application/json');
    const parsedUrl = new URL(url,`http://${req.headers.host}`)
    
    //get request
    if (method==='GET' && parsedUrl.pathname === '/api/items') {
        res.end(JSON.stringify({message:'GET Request - Fetching all Items'}));
    }

    // POST request
    else if (req.method === 'POST' && parsedUrl.pathname === '/api/items') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString(); // Convert Buffer to string and append to body
        }); 
        req.on('end', () => {
          console.log('Received POST data:', body);
          const newItem = JSON.parse(body)
          res.statusCode = 201;
          // Respond back to the client
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(JSON.stringify({message:'POST request - Adding new item',
             data:newItem}));
        });
      }
})

server.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})