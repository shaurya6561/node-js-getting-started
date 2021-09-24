const request = require('request');
const express = require('express')
const app = express()
const port = 3100


function processReponse (response) {

    // console.log("processing");

    const regex = /(homepage-module latest)/i;

    const matches = response.match(regex);

    const sectionStart = matches['index'];

    let sectionContent = response.substring(sectionStart);

    sectionEnd = sectionContent.match(/<\/section>/i);

    sectionContent = sectionContent.substring(0, sectionEnd['index']);

    const titleRegEx = /<a\shref=([^\"]*)>(.*)<\/a>/g;

    const titleMatches = [...sectionContent.matchAll(titleRegEx)];

    const titles = []

    titleMatches.forEach(element => {
        
        console.log(element[1])
        console.log(element[2])
        console.log("------------------------------------------")

        titles.push({
            url: element[1],
            title: element[2],
        })

    });

    console.log(titles);

    return titles;
}

app.get('/', (req, res) => {

    request('https://www.time.com', function (error, response, body) {

        // console.error('error:', error); // Print the error if one occurred

        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        // console.log('body:', body); // Print the HTML for the Google homepage.

        res.send(processReponse(body));

    });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})