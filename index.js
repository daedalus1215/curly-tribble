const cluster = require('cluster');
const e = require('express');
const express = require('express');
const app = express();


console.log(cluster.isMaster);

// if file is being executed in master mode, then we want to .fork(), to cause
// index.js to be executed again, but in slave mode. 
if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
} else {

    function doWork(duration) {
        // we want to use as much cpu power as we can for some duration (in ms).
        const start = Date.now();
        while (Date.now() - start < duration) { }
    }


    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi there!');
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast');
    });

    app.listen(3001);    
}
