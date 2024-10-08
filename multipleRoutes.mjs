import {createServer} from 'node:http'

const PORT = 3000
const server = createServer((req,res)=>{
    //multiple routes
    const url = req.url;
    if (url === '/') {
        res.end('Welcome to Home Page.')
    }
    else if (url === '/about') {
        res.end('This is About Page.')
    }
    else if (url === '/contact') {
        res.end('This is Contact Page.')
    }
    else if (url === '/services') {
        res.end('This is Services Page.')
    }
    else{
        res.statusCode = 404
        res.end('Page Not Found')
    }

})

server.listen(PORT,()=>{
    console.log(`Server is listening at: http://localhost:${PORT}`);
})