const app = require('express')();
const fs = require('fs');
const https = require('https');
const hls = require('hls-server');
const url = require('url');


const options = {
  key: fs.readFileSync('certificates/localhost-key.pem'),
  cert: fs.readFileSync('certificates/localhost.pem')
};

const server = https.createServer(options, app);

var id=0;
var index=0;
app.get('/', function (req, res) {
    var parse = url.parse(req.url, true);
    var path = parse.path;
    if(path!='/'){
        id= path.split('?')[1].split('&')[0].split('=')[1];
        var fname= path.split('?')[1].split('&')[1].split('=')[1];
        var lname= path.split('?')[1].split('&')[2].split('=')[1];
        var age= path.split('?')[1].split('&')[3].split('=')[1];

        const string = { id: id, fname: fname, lname: lname, age: age};
        let data = JSON.stringify(string)
        var dir = './results/id'+id;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        var file = './results/id'+id+'/info.json';
        fs.writeFileSync(file, data);
        index =0;
        console.log(id);
    }
    return res.status(200).sendFile(`${__dirname}/index.html`);
});
//routing file
app.get('/:namefile', function (req,res) {
    return res.status(200).sendFile(`${__dirname}/`+req.params.namefile);
});

app.use(require('express').json());

var index=0;
app.post('/', function(req, res){
    console.log(req.body);   
    res.send(req.body);   
    let data = JSON.stringify(req.body);
    var file = './results/id'+id+'/test'+index+'.json';
    fs.writeFileSync(file, data);
    index++;
});

server.listen(3000, () => { console.log('listening on 3000') });

new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        }
    }
});
