const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const ObjectsToCsv = require("objects-to-csv");

const PORT = 8000;
let itemCount = 0;
const app = express();

const url = "https://www.size.co.uk/mens/footwear/brand/nike/?max=204&AJAX=1";

fs = require("fs");

// Call the axios library to the speficyc website
axios(url)
    // get the response into the result parameter
    .then((result) => {
        // store the data of the result into the html variable
        const html = result.data;

        // call the cheerio library to load the data stored into the html variable
        // this is done by calling the load method and passing the data stored in html variable
        // store this into the $ variable
        const $ = cheerio.load(html);

        // create an array to store each item found
        const items = [];

        // For each item found with the class name 'itemContainer' we will get the text included
        $(".itemInformation", html).each(function () {
            /*         const name = $('.itemTitle').text()
        const price = $('.itemPrice').text()

       */

            //      TO-DO Isolate each of the variable into an array
            itemCount++;
            const title = $(this).find("a").text(); // 51%
            let price = $(this).find(".pri").text();
            if (price.length > 8) {
                price = `${price.slice(6, 14).trim(" ")}`;
            }
            // console.log(`Name: ${title} price: ${price}`);
            items.push({
                title,
                price,
            });
        });

        //Store array into csv file
        const csv = new ObjectsToCsv(items);
        async function writeToFile(items) {
            await csv.toDisk("./secondary-file.csv");
        }
        writeToFile();

        console.log(items);
        console.log(items.length);
    })
    .catch((err) => {
        console.log("Error found", err);
    });

// Express listen to port assigned
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
