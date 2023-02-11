const express = require('express')
const cors = require('cors');
const fs = require('fs')

const PORT = 9001;

const app = express();
app.use(cors())

const videoFileMap={
    'cdn':'videos/cdn.mp4'
}

app.get('/videos/:filename', (req, res)=> {
    const fileName = req.params.filename;
    const filePath = videoFileMap[fileName]
    if(!filePath){
        return res.status(404).send('File not fund')
    }
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    const range = req.headers.range

    if(range){
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, {start, end});
        const head =  {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Rages': 'bytes',
        'Content-Lenght': chunksize,
        'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
    }else {
        const head =  {
        'Content-Lenght': fileSize,
        'Content-Type': 'video/mp4'
        };
        res.writeHead(200,head)
        fs.createReadStream(filePath).pipe(res)
   }
})


app.get('/', (req, res)=>{
    res.json('Ola, bem vindo a minha API! 2.0')
})

app.listen(PORT, ()=>{
    console.log(`rodando na porta ${PORT}`)
})