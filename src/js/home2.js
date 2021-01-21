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

// console.log('prueba de asincronismo');


(async function load(){

    const $featuringContainer = document.getElementById('featuring')
    const $home = document.getElementById('home')
    const $form= document.getElementById('form')

    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')


    // generos
    //action- terror -animation
    async function getData(url){
        const response = await fetch(url);
        const data = await response.json()
        return data;
        // console.log(data)
    }


    //funcion para crear multiples atributos a un elemneto
    function setAttributes($element, attributes){
        for(const attribute in attributes){
            $element.setAttribute(attribute, attributes[attribute])
        }
    }


    $form.addEventListener('submit', (event) => {
        event.preventDefault()//para evitar que la paginas se recargue cada vez que el usaurio busque una pelicual
        $home. classList.add('search-active') //cada vez que el usaurio busque una pelicual se agragra esta clase al home
        const $loader = document.createElement('img') //crear un elemento html desde cero
        setAttributes($loader, { 
            src: 'src/images/loader.gif',
            height: 50,
            width: 50
        })
        $featuringContainer.append($loader)
    })


    
    const urlApi = 'https://yts.mx/api/v2/list_movies.json?genre='

    const actionList = await getData(`${urlApi}action`)
    const dramaList = await getData(urlApi+'drama')
    const animationList = await getData(urlApi+'animation')

    /*
    console.log('actionList', actionList)
    console.log('actionDrama', dramaList)
    console.log('actionAnimation', animationList);
    */

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
    
    function createTemplate(HTMLString){
        const html = document.implementation.createHTMLDocument() //crea un documento html
        html.body.innerHTML = HTMLString //inner inserta al body la plantilla htmlString
        return html.body.children[0]; //devuelve el primer hijo de body
    }

    //hacer un evento cuando el usuario de click sonbre el dom creado es decir la imagen de la pelicuals
    function addEventClick($element){
        $element.addEventListener('click',() =>  showModal()) //cuando el usuario de buscar se llama la funcion showModal
    }

    //funcion para renderizar los html
    function renderMovieList( list, $conatiner){
        
        $conatiner.children[0].remove() //elimina el la img git de carga 

        //actionList.data.movies // esto se cambio por el parmetro list
        list.forEach((movie) => {
            // console.log(movie)
            const HTMLString = videoItemTemplate(movie)
            const movieElement = createTemplate(HTMLString)
            // const html = document.implementation.createHTMLDocument() //crea un documento html    estas dos lineas se llevaron a una funcion createTemplate
            // html.body.innerHTML = HTMLString //inner inserta al body la plantilla htmlString
            //$actionContainer  //se cambio por el parametro container 
            $conatiner.append(movieElement)
            addEventClick(movieElement)//le pasamos  a esta funcion el elemento html que qeremos agragarle un evento
            // console.log(HTMLString)
        })
    }
    

    function showModal(){
        $overlay.classList.add('active')//le agregamos una clase que activa este elemnto
        $modal.style.animation = 'modalIn .8s  forwards' //le agregamos una animacion
    }


    //cuando el usuario de click en cerrar el modal
    $hideModal.addEventListener('click', hideModal)
    function hideModal(){
        $overlay.classList.remove('active')//le quitamos una clase que activa este elemnto
        $modal.style.animation = 'modalOut .8s  forwards' //le agregamos una animacion
    }

    //const $actionContainer = document.querySelector('#action') // la declaro antes de ser utilizada
    const $actionContainer = document.getElementById('action')
    const $dramaContainer = document.getElementById('drama')
    const $animationContainer = document.getElementById('animation')


    renderMovieList(actionList.data.movies, $actionContainer)
    renderMovieList(dramaList.data.movies, $dramaContainer)
    renderMovieList(animationList.data.movies, $animationContainer)

    // SELECTORES

    // CON JQUERY

    // const home = $('.home')

    //js

    // const $home = document.getElementById('modal')
    


    
})()

// console.log('prueba de asincronismo 2')







