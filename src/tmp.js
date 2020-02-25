var querystring = require('querystring');


let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

console.log(arr.slice(11,20)

);
var params = {
    api_key: "1234",
    page: 1
}

var url = "http://localhost:3000";

console.log(url += '?'+ querystring.stringify(params));


let user = {
    "username": "hoanghaik59",
    "password": "asda"
}

let token = {
    "token" : "Adsada"
}

console.log(JSON.stringify({...user, ...token}))


#.env
REACT_APP_API_KEY=03ed836b5481c0be0b7edb81032d017e
REACT_APP_API_URL=https://api.themoviedb.org/3
REACT_APP_API_URL_IMAGE=https://image.tmdb.org/t/p/w500
REACT_APP_API_URL_POSTER=https://image.tmdb.org/t/p/original
REACT_APP_API_DEFAULT_BACKDROP=https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg
REACT_APP_API_DEFAULT_POSTER=https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg