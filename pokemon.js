class Pokemon {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
 }
  
 const Catmon = new Pokemon(900, 'Catmon')
  
 const newButton = document.querySelector('#newPokemon')
 newButton.addEventListener('click', function () {
    let pokeId = prompt("Please enter a Pokemon ID")
    if (pokeId > 0 && pokeId <= 807) {
        getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            .then(result => {
                populateDOM(result)
            })
    } else {
        alert('There are no Pokemon with that ID. Choose another one.')
    }
 })
  
 async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
 }
  
 // now, use the returned async data
 const theData = getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then(data => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url).then(pokeData => {
            populateDOM(pokeData)
        })
    }
 })
  
 let mainArea = document.querySelector('main')
  
 function populateDOM(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')
  
    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)
  
    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
  
    mainArea.appendChild(pokeScene)
  
    pokeCard.addEventListener('click', function () {
        pokeCard.classList.toggle('is-flipped');
    });
 }
  
 function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'charDivs card__face card__face--front')
    let name = document.createElement('p')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
    let pokeNum = getPokeNumber(data.id)
    name.textContent = `${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
  
    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
  
    pokeFront.appendChild(name)
    pokeFront.appendChild(pic)
 }
  
 function fillCardBack(pokeBack, data) {
    pokeBack.setAttribute('class', 'card__face card__face--back')
    let pokeHP = document.createElement('p')
    let pokeSpeed = document.createElement('p')
    let pokeDefense = document.createElement('p')
    let pokeAttack = document.createElement('p')
    let pokeType = document.createElement('p')
    pokeHP.textContent = `HP:${data.stats[5].base_stat}`
    pokeSpeed.textContent = `Speed:${data.stats[0].base_stat}`
    pokeDefense.textContent = `Defense:${data.stats[3].base_stat}`
    pokeAttack.textContent = `Attack:${data.stats[4].base_stat}`
    pokeType.textContent = `Type:${data.types[0].type.name}`
    pokeBack.appendChild(pokeHP)
    pokeBack.appendChild(pokeSpeed)
    pokeBack.appendChild(pokeDefense)
    pokeBack.appendChild(pokeAttack)
    pokeBack.appendChild(pokeType)
 }
  
 function getPokeNumber(id) {
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
        return `0${id}`
    } else return id
 }
 