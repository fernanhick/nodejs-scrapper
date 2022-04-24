const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')

const PORT = 8000


const app = express()


const url = 'https://www.size.co.uk/mens/footwear/'

// Call the axios library to the speficyc website
axios(url)
// get the response into the result parameter
.then((result) => {
    // store the data of the result into the html variable
    const html = result.data
    // call the cheerio library to load the data stored into the html variable
    // this is done by calling the load method and passing the data stored in html variable 
    // store this into the $ variable
    const  $ = cheerio.load(html)

    // create an array to store each item found
    const items = []

    // For each item found with the class name 'itemContainer' we will get the text included
    $('.itemInformation', html).each(function () {
                
/*         const name = $('.itemTitle').text()
        const price = $('.itemPrice').text()

       items.push({
           name,
           price
       }) */ 

        //      TO-DO Isolate each of the variable into an array

       const a = $(this).text(); // 51%
       const item = a.slice(' ')
       console.log(a)
      
    })

    const checkChanges = async (items) =>{
        // Compare each items if the price have been changes
    }

    
    
}).catch((err) => {
    console.log('Error found', err)
});


// Express listen to port assigned
app.listen(PORT, () => console.log(`server running on port ${PORT}`))


