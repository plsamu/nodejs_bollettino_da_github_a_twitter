const
    fs = require("fs"),
    { loadImage, createCanvas, registerFont } = require('../node_modules/canvas')

registerFont('./fonts/Montserrat-SemiBold.ttf', { family: 'Montserrat-SemiBold' })
registerFont('./fonts/TimesNewRomanPSBold.ttf', { family: 'TimesNewRomanPSBold' })

async function createImage(json) {

    const WIDTH = 1080
    const HEIGHT = 1080

    const canvas = createCanvas(WIDTH, HEIGHT)
    const ctx = canvas.getContext("2d")

    var alignw = canvas.width / 6;
    var alignh = canvas.height / 4;

    // Background
	const background = await loadImage('./base.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = "#000000";
    ctx.font = "64px TimesNewRomanPSBold"; // size family
    ctx.fillText(json.message1,               alignw, alignh);
    ctx.fillText(json.message2,               alignw, alignh + 70);
    ctx.fillText(json.data,                   alignw, alignh + 140);
    ctx.fillText(json.totale_casi,            alignw, alignh + 240);
    ctx.fillText(json.deceduti,               alignw, alignh + 310);
    ctx.fillText(json.dimessi_guariti,        alignw, alignh + 380);
    ctx.fillText(json.tamponi,                alignw, alignh + 450);
    ctx.fillStyle = "#000000";
    ctx.font = "32px TimesNewRomanPSBold";
    ctx.fillText(json.terapia_intensiva,      alignw, alignh + 540);
    ctx.fillText(json.ricoverati_con_sintomi, alignw, alignh + 590);
    ctx.fillText(json.casi_testati,           alignw, alignh + 640);
    
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("topublic.png", buffer);
}

module.exports = createImage