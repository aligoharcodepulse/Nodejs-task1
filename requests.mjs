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
})

server.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})