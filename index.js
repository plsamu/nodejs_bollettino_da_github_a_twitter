const utils = require('./core/utils')
const createImage = require('./core/createImage')
const calculateDatas = require('./core/calculateData')
const Twit = require('twit')
const fs = require('fs')

let T = new Twit({
    consumer_key:           'G2OiLZ5Zhl8Igaltricaratteri',
    consumer_secret:        'rdNqCpVHzAZKKjjOngmoltialtricaratteri',
    access_token:           '104067217altricaratteri-cbUDKLsmoltialtricaratteri',
    access_token_secret:    'De3751G8X2oSmoltialtricaratteri'
})

let dateYesterday = new Date(0)

lambda = async (event) => {
    let json_body = null
    try {
        json_body = await utils.fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json')
    }
    catch( err ) {
        console.log("> Promise Rejected: fetch failed \n " + err)
        return 'error'
    }

    let json_array = null
    try { json_array = JSON.parse(json_body) }
    catch (e) { 
        console.log('PARSE ERROR: ' + e)
        return 'error'
    }

    let json_obj_yesterday = json_array[json_array.length-2] // Dati ieri
    let json_obj_today = json_array[json_array.length-1] // Dati oggi

    const dateJson = new Date(json_obj_today.data);
    if(utils.compareDates(dateYesterday, dateJson)) {

        let json_result = calculateDatas(json_obj_yesterday, json_obj_today, json_array) // Calc data

        try { 
            await createImage(json_result) // Create image
        }
        catch (e) { 
            console.log('CREATE IMAGE ERROR: ' + e)
            return 'error'
        }
        
        try {
            publish('./topublic.png')
            dateYesterday = dateJson // save the date of the last published image
        }
        catch (e) { 
            console.log('PUBLISH IMAGE ERROR: ' + e) 
            return 'error'
        }

        return 'published'
    }
    else {
        console.log('dates are equals')
        return 'unpublished';
    }
}

lambda()

function publish(path) {
    T.postMediaChunked({ file_path: path }, function (err, data, response) {
        if(err) console.log(err)
        console.log(data)
        T.post('statuses/update', { status: '', media_ids: data.media_id_string }, function(err, data, response) {
            console.log(data)
        })
    })
}