/*
const noCambia = 'Alex'
let cambia = '@Alexander'

function cambiarNombre(nuevoNombre){
    cambia = nuevoNombre
}
*/

// ---promesa
/*
const getUserAll = new Promise(function(todoBien, todoMal){
    //llamar API 
    setTimeout(function(){
        // todoMal('se acabo el tiempo p1')
        todoBien('TODO BIEN p1')
    }, 5000)
})

*/


// arrow function
/*
const getUserAll = new Promise((todoBien, todoMal) => {
    setTimeout(() => {
        todoBien('Todo va bien')
    }, 5000)
})

const getUser = new Promise(function(todoBien, todoMal){
    //llamar API 
    setTimeout(function(){
        // todoMal('se acabo el tiempo')
        todoBien('TODO BIEN p2')
    }, 3000)
})
*/

/*
getUser
    .then(function(){
        console.log('todo salio bien')
    })
    .catch(function(message){
        console.log(message)
    })
*/

//para varias promesas
/*
Promise.all([
    getUserAll,
    getUser
])
.then(function(message){
    console.log(message)
})
.catch(function(message){
    console.log(message)
})
*/



// -------ajax - js----------
/*
$.ajax('https://swapi.dev/api/people/1', {
  method: 'GET',
  success: function(data) {
    console.log(data)
  },
  error: function(error) {
    console.log(error)
  }
})
*/
/*
fetch('https://swapi.dev/api/people/1')
    .then(function(response){
        console.log(response)
        return response.json()
    })
    .then(function(data){
        console.log(data.name)
    })
    .catch(function(){
        console.log('algo fallo')
    });
    */




// funciones asincronas

console.log('prueba de asincronismo');


(async function load(){
    // generos
    //action- terror -animation
    async function getData(url){
        const response = await fetch(url);
        const data = await response.json()
        return data;
        // console.log(data)
    }
    
    const urlApi = 'https://yts.mx/api/v2/list_movies.json?genre='

    const actionList = await getData(`${urlApi}action`)
    const actionDrama = await getData(urlApi+'drama')
    const actionAnimation = await getData(urlApi+'animation')

    console.log('actionList', actionList)
    console.log('actionDrama', actionDrama)
    console.log('actionAnimation', actionAnimation);
}
)()

console.log('prueba de asincronismo 2')
