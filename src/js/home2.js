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

    const $friendsContainer = document.getElementById('friends')

    

    //template del modal donde se renderiza la pelicula que se busca
    function featuringTemplate(peli){

        //desestrucutuacion el objeto que esta dentro de un array(movies)
        const {
            title,
            medium_cover_image
        } = peli;
        return (
        `
            <div class="featuring">
            <div class="featuring-image">
              <img src="${medium_cover_image}" width="70" height="100" alt="">
            </div>
            <div class="featuring-content">
              <p class="featuring-title">Pelicula encontrada</p>
              <p class="featuring-album">${title}</p>
            </div>
          </div>
        `
        //con la desestrucutracion ya no debo colocar peli.title sino solo title
        )
    }


    //template de playList de amigos
    function playListFriendsTemplate(name, img){

        return (
            `
            <li class="playlistFriends-item">
            <a href="#">
              <img src="${img}" alt="echame la culpa" />
              <span>
                ${name}
              </span>
            </a>
          </li>

            `
        )
    }



    async function getDataFriends($container){
        const response = await fetch('https://randomuser.me/api/')
        const data = await response.json()
        const name = await data.results[0].name.first 
        const lastname = await data.results[0].name.last 
        const img = await data.results[0].picture.medium
        /*
        console.log(data)
        console.log(data.results)
        console.log(name)
        console.log(lastname)
        console.log(img)
        */
        const template = playListFriendsTemplate(name, img)
        const dom = createTemplate(template)
        $container.append(dom)
    }


    function listarFriends(numero){
        for(let i = 0 ; i < numero; i ++){
            getDataFriends($friendsContainer)
        }

    }

    listarFriends(10)
   


    // generos
    //action- terror -animation
    async function getData(url){
        const response = await fetch(url);
        const data = await response.json()

        if(data.data.movie_count > 0){ // si hay mas de cero coincidencias en la busqueda de la pelicual
            return data;
            // console.log(data)
        }
        //si no hay peliculas
        throw new Error('No se encontro ningun resultado')
    }



    //funcion para crear multiples atributos a un elemneto
    function setAttributes($element, attributes){
        for(const attribute in attributes){
            $element.setAttribute(attribute, attributes[attribute])
        }
    }



    $form.addEventListener('submit', async(event) => {//el evento es una funcion asincrona
        event.preventDefault()//para evitar que la paginas se recargue cada vez que el usaurio busque una pelicual
        $home. classList.add('search-active') //cada vez que el usaurio busque una pelicual se agragra esta clase al home
        const $loader = document.createElement('img') //crear un elemento html desde cero
        setAttributes($loader, { 
            src: 'src/images/loader.gif',
            height: 50,
            width: 50
        })
        $featuringContainer.append($loader)

        const data = new FormData($form)//obtenemos los valores del form, que declaramos previamente, gracias al name del formulario
        try {
            // const peli = await getData(`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${data.get('name')}`)//con limit=1 limito la bsuqueda a 1 resulatdo
            //destructuracion de objetos //esto modifico lo de arriba
            const {
                data:{
                    movies: pelis
                }
            }= await getData(`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${data.get('name')}`)
            //data.get('name')//retorna el valor del elemento en html con el name = 'name'
            const HTMLString= featuringTemplate(pelis[0])
            $featuringContainer.innerHTML = HTMLString 
            
        } catch (error) { //si el usuario busca una pelicula que no existe
            alert(error.message)
            $loader.remove()//elimina el html creado desde cero
            $home.classList.remove('search-active')
        }

    })



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

    function videoItemTemplate(movie, category){
        return (
            `<div class='primaryPlaylistItem' data-id='${movie.id}' data-category=${category}>
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
        $element.addEventListener('click',() =>  showModal($element)) //cuando el usuario de buscar se llama la funcion showModal
    }

    //funcion para renderizar los html
    function renderMovieList( list, $conatiner, category){
        
        $conatiner.children[0].remove() //elimina el la img git de carga 

        //actionList.data.movies // esto se cambio por el parmetro list
        
        list.forEach((movie) => {
            // console.log(movie)
            const HTMLString = videoItemTemplate(movie, category)
            const movieElement = createTemplate(HTMLString)
            // const html = document.implementation.createHTMLDocument() //crea un documento html    estas dos lineas se llevaron a una funcion createTemplate
            // html.body.innerHTML = HTMLString //inner inserta al body la plantilla htmlString
            //$actionContainer  //se cambio por el parametro container 
            $conatiner.append(movieElement)
            const image = movieElement.querySelector('img')//guardamos en una variable los elementos con id img, es decir la imagen
            image.addEventListener('load', (event) => {

               // movieElement.classList.add('fadeIn')//se le agrega la clase fadeIn para aplicarle animaciones 
               event.target.classList.add('fadeIn')//fade solo se le aplicara a la iamgen
            })
            addEventClick(movieElement)//le pasamos  a esta funcion el elemento html que qeremos agragarle un evento
            // console.log(HTMLString)
        })
    }

    function findId(list, id){
        return list.find((movie) =>  movie.id === parseInt(id,10))
    }
    

    function findMovie(id, category){
        switch(category){
            case 'action':{
                // actionList.find((movie) =>  movie.id === parseInt(id,10))
                return findId(actionList, id)
                
            }
            case 'drama':{
                // actionList.find((movie) =>  movie.id === parseInt(id,10))
                return findId(dramaList, id)
               
            }
            default: {
                return findId(animationList, id)
              
            }
        }
        
    }


    function showModal($element){
        $overlay.classList.add('active')//le agregamos una clase que activa este elemnto
        $modal.style.animation = 'modalIn .8s  forwards' //le agregamos una animacion
        //const id = $element.dataset.id
        //const category = $element.dataset.category
        const { id, category } = $element.dataset //desestruturing //igual a las 2 lineas de arriba

        const data = findMovie(id, category)

        $modalTitle.textContent = data.title
        $modalImage.setAttribute('src', data.medium_cover_image)
        $modalDescription.textContent = data.description_full
        
    }


    //cuando el usuario de click en cerrar el modal
    $hideModal.addEventListener('click', hideModal)
    function hideModal(){
        $overlay.classList.remove('active')//le quitamos una clase que activa este elemnto
        $modal.style.animation = 'modalOut .8s  forwards' //le agregamos una animacion
    }



    async function cacheExits(category){
        const listName = `${category}List`
        // const cacheList = window.localStorage.getItem(listName)
        const cacheList = window.sessionStorage.getItem(listName)
        if(cacheList){ //si hay datos guardados en la memoria
            return JSON.parse(cacheList)//se convierete de texto a un ojbeto
        }

        // const data =  await getData(`${urlApi}${category}`)
        const { data: { movies: data } } =  await getData(`${urlApi} ${category}`)
        // window.localStorage.setItem(listName, JSON.stringify(data))
        window.sessionStorage.setItem(listName, JSON.stringify(data))

        return data
    }

     

     const urlApi = 'https://yts.mx/api/v2/list_movies.json?genre='

    //const $actionContainer = document.querySelector('#action') // la declaro antes de ser utilizada
    const $actionContainer = document.getElementById('action')
    const $dramaContainer = document.getElementById('drama')
    const $animationContainer = document.getElementById('animation')

    /*
    renderMovieList(actionList.data.movies, $actionContainer,'action')
    renderMovieList(dramaList.data.movies, $dramaContainer, 'drama')
    renderMovieList(animationList.data.movies, $animationContainer, 'animation')
    */  

    // const actionList = await getData(`${urlApi}action`)
    //const { data: { movies: actionList } } = await getData(`${urlApi}action`)//destructurado
    const actionList = await cacheExits('action')
    // window.localStorage.setItem('actionList', JSON.stringify(actionList)) // esto ahorra se hace con la funcion cacheExits
    renderMovieList(actionList, $actionContainer,'action')

    // const dramaList = await getData(urlApi+'drama')
    // const { data: { movies: dramaList } } = await getData(urlApi+'drama')//desestrucutrado
    const dramaList = await cacheExits('drama')
    // window.localStorage.setItem('dramaList',JSON.stringify(dramaList))
    renderMovieList(dramaList, $dramaContainer, 'drama')

    // const animationList = await getData(urlApi+'animation')
    // const { data: { movies: animationList } } = await getData(urlApi+'animation')//desestructutado
    const animationList = await cacheExits('animation')
    // window.localStorage.setItem('animationList', JSON.stringify(animationList))
    renderMovieList(animationList, $animationContainer, 'animation')


    // SELECTORES

    // CON JQUERY

    // const home = $('.home')

    //js

    // const $home = document.getElementById('modal')
    
})()

// console.log('prueba de asincronismo 2')







