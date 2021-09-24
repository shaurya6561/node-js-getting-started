const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

function getRequest(res)
    {
        const request = require('request')
        request('https://time.com/', function(error, response, body)
        {
            // console.error('error:', error)
            // console.log('body:', body)
            if(body)
                matchData(body,res)
        })
    }

    function matchData(data,res)
    {
        const result = data.match('(.)')
         console.log(result.input)
        res.send(result.input)
    }


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => getRequest(res))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
