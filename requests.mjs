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


      // PUT request
      else if (req.method === 'PUT' && parsedUrl.pathname.startsWith('/api/items/')) {
        let body = '';
        const itemId = parsedUrl.pathname.split('/').pop(); 
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const updatedItem = JSON.parse(body);
            res.statusCode = 200;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              message: `PUT request received for Id: ${itemId}`,
              updatedItem: updatedItem
            }));
          } catch (error) {
            res.statusCode = 400; 
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
          }
        });
      }


      // DELETE request
      else if (method==='DELETE' && parsedUrl.pathname.startsWith('/api/items/')) {
        const itemId = parsedUrl.pathname.split('/').pop()
        res.end(JSON.stringify({message:`Delete Request - Item Deleted with Id ${itemId}`}))
    }
})

server.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})