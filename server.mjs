import {createServer} from 'node:http'

const PORT = 3000
const server = createServer((req,res)=>{
    res.end('Server is listening');
})

server.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})