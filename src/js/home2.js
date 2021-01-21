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

     // CREACION TEMPLATES

    //JQUERY

    /*
    '<div class= "primaryPlaylistItem">' +
        '<div class ="primaryPlaylistItem-image">' +
            '<img src="src/images/covers/midnight.jpg">' +
        '</div>' +
        <h4 class ="primaryPlaylistItem-title">
            Titulo de la peli
        </h4>
    </div>'
    */

    //JS -TEMPLATES LITERALS

    function videoItemTemplate(movie){
        return (
            `<div class='primaryPlaylistItem'>
                <div class='primaryPlaylistItem-image'>
                    <img src=${movie.medium_cover_image}></img>
                </div>
                <h4 class='primaryPlaylistItem-title'>
                    ${movie.title}
                </h4>
            </div>`
        )
    }

    // console.log(videoItemTemplate('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/poster-peliculas-terror-2019-muneco-diabolico-1578395577.jpg?crop=1xw:1xh;center,top&resize=480:*', 'Chucky'))
    
    //const $actionContainer = document.querySelector('#action') // la declaro antes de ser utilizada
    const $actionContainer = document.getElementById('action')
    actionList.data.movies.forEach((movie) => {
        // console.log(movie)
        const HTMLString = videoItemTemplate(movie)
        const html = document.implementation.createHTMLDocument() //crea un documento html
        html.body.innerHTML = HTMLString
        $actionContainer.append(html.body.children[0]) //se imprime en el html
        console.log(HTMLString)
        
    });

    // SELECTORES

    // CON JQUERY

    // const home = $('.home')

    //js

    // const $home = document.getElementById('modal')
    
    const $dramaContainer = document.getElementById('drama')
    const $animationContainer = document.getElementById('animation')

    const $featuringContainer = document.getElementById('featuring')
    const $form= document.getElementById('form')
    const $home = document.getElementById('home')

    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')


   

    
})()

console.log('prueba de asincronismo 2')







