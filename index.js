const express = require('express')
const cors = require('cors')
const cloudinary = require('cloudinary').v2

const PORT = 9001;

const app = express();
app.use(express.json())

//cors config
app.use(cors())
let allowlist = ['http://localhost:5173/', 'http://localhost:5173/video']
let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

  //cloudinary config
cloudinary.config({
    cloud_name: 'devapijs',
    api_key: '561547377951432',
    api_secret: 'q16XvSRuIt8qhTOujWqYObSbRXE'
});

//cloudinary uploud video
let imgurl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSS3MA676-bUImhiQl5Wh0dDa6mXTh8tSaQ&usqp=CAU';

// cloudinary.uploader.upload( imgurl,{
//    public_id: 'ovini'
//})
//.then(result=>console.log([
//    result.public_id,
//    result.url
//]))

//cloudinary upload video
let vidup = './videos/cdn.mp4';
let vidupurl = '';
cloudinary.uploader.upload(vidup, {
    resource_type: 'video',
    public_id: 'video01',
})
.then(result=>{
    vidupurl = result.url,
    console.log(vidupurl)
})

const videoFileMap={
    'cdn':'videos/cdn.mp4'
}

app.get('/', cors(corsOptionsDelegate), (req,res,next)=>{
    return res.json({videoUrl:vidupurl})
    next()
})

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