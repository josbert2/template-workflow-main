let obj = {
    "Gotham": "Gotham-Rounded-Light",
    "Proxima-Nova": "Proxima-Nova-Light",
    "Google": "Google"
}
const apiURL = 'https://baconipsum.com/api/?callback=?';

var random  = (len) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.";
}
   


let select = document.getElementById("list-font");
for (var key in obj) {
    if(obj.hasOwnProperty(key)) {
        var option = document.createElement("div");
        var div = document.createElement("div")


        option.innerHTML = key;
        option.classList.add('main-title')
        option.style.fontFamily = obj[key]

        
        div.classList.add('sub-title')
        div.innerHTML = random()
        option.append(div)

        
        
        select.append(option)
    }
}


var cssId = 'font-stack';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '../css/font-stack.css';
    link.media = 'all';
    head.appendChild(link);
}