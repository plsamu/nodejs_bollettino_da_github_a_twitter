
function getData(ieri, oggi, json_array) {

    const dateYesterday = new Date(ieri.data)
    const dateToday = new Date(oggi.data)
    const month = dateToday.getMonth() + 1
    const tamponi_oggi = Math.abs(oggi.tamponi - ieri.tamponi)
    const tamponi_ieri = Math.abs(ieri.tamponi - json_array[json_array.length-3].tamponi )

    let output = {
        message1: "COVID-19 ITALIA",
        message2: "AGGIORNAMENTO",
        data: dateToday.getFullYear() + "/" + month + "/" + dateToday.getDate() + " 17:00",
        totale_casi: "Casi totali: " + oggi.totale_casi + ` (${oggi.nuovi_positivi})`,
        deceduti: "Deceduti: " + oggi.deceduti + ` (${ieri.deceduti - oggi.deceduti})`,
        dimessi_guariti: "Guariti: " + oggi.dimessi_guariti + ` (${ieri.dimessi_guariti - oggi.dimessi_guariti})`,
        tamponi: "Tamponi: " + tamponi_oggi + ` (${tamponi_oggi - tamponi_ieri})`,
        terapia_intensiva: "Terapie intensive: " + oggi.terapia_intensiva + ` (${oggi.terapia_intensiva - ieri.terapia_intensiva})`,
        ricoverati_con_sintomi: "Ricoverati: " + oggi.ricoverati_con_sintomi + ` (${oggi.ricoverati_con_sintomi - ieri.ricoverati_con_sintomi})`,
        casi_testati: "Casi testati: " + `${oggi.casi_testati - ieri.casi_testati}`
    }
    return output
}

function log(line) {
    console.log(line)
}

module.exports = getData

function logData(ieri, oggi) {
    const dateYesterday = new Date(ieri.data)
    const dateToday = new Date(oggi.data)
    log(dateYesterday)
    log(dateToday)
    log(dateToday.getFullYear() + "/" + month + "/" + dateToday.getDate() + " 17:00")
    log("Casi totali: " + oggi.totale_casi + ` (+${oggi.nuovi_positivi})`)
    log("Deceduti: " + oggi.deceduti + ` (${ieri.deceduti - oggi.deceduti})`)
    log("Guariti: " + oggi.dimessi_guariti + ` (${ieri.dimessi_guariti - oggi.dimessi_guariti})`)
    log("Tamponi: " + tamponi_oggi + ` (${tamponi_oggi - tamponi_ieri})`)
    log("Terapie intensive: " + oggi.terapia_intensiva + ` (${oggi.terapia_intensiva - ieri.terapia_intensiva})`)
    log("Ricoverati: " + oggi.ricoverati_con_sintomi + ` (${oggi.ricoverati_con_sintomi - ieri.ricoverati_con_sintomi})`)
    log("Casi testati: " + `${oggi.casi_testati - ieri.casi_testati}`)
}