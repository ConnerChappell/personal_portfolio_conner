import { people } from '/assets/people.js'
import { films } from '/assets/films.js'

let mainArea = document.querySelector("main")

// Characters
people.forEach((person) => {
  let personDiv = document.createElement("div")
  let name = document.createElement("h2")
  let gender = document.createElement("p")
  let pic = document.createElement("img")

  let charNum = getCharNumber(person.url)

  name.textContent = person.name
  gender.textContent = `Gender: ${person.gender}`
  pic.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

  personDiv.appendChild(name)
  personDiv.appendChild(gender)
  personDiv.appendChild(pic)

  mainArea.appendChild(personDiv)
})


let section = document.querySelector("section")

// Films
films.forEach((film) => {
  let filmDiv = document.createElement("div")
  let filmTitle = document.createElement("h2")
  let filmEpisode = document.createElement("h3")
  let filmDirector = document.createElement("h3")
  let filmDate = document.createElement("h3")
  let filmCrawl = document.createElement("p")

  filmTitle.textContent = film.title 
  filmEpisode.textContent = `Episode ${film.episode_id}`
  filmDirector.textContent = `Director : ${film.director}`
  filmDate.textContent = `Release Date : ${film.release_date}`
  filmCrawl.textContent = film.opening_crawl

  // Opening Crawl Button 
  let crawlButton =document.createElement("button")
  crawlButton.textContent = "Click for Opening Crawl"
  crawlButton.addEventListener("click", () => {
    return filmDiv.appendChild(filmCrawl)
  })

  filmDiv.appendChild(filmTitle)
  filmDiv.appendChild(filmEpisode)
  filmDiv.appendChild(filmDirector)
  filmDiv.appendChild(filmDate)
  filmDiv.appendChild(crawlButton)

  section.appendChild(filmDiv)
})

function getCharNumber(charURL) {
  let end = charURL.lastIndexOf("/")
  let charID = charURL.substring(end - 2, end)
  if (charID.indexOf("/") !== -1) {
    return charID.slice(1, 2)
  } else {
    return charID
  }
}

// Filter Buttons for Characters Start
const allDivs = Array.from(document.querySelectorAll("div"))
const mainHeader = document.querySelector("header")

let maleButton = document.createElement("button")
maleButton.textContent = "Male Characters"
maleButton.addEventListener("click", () => {
  maleCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    matchedDiv.className = "animated infinite bounce slow"
  })
})

let femaleButton = document.createElement("button")
femaleButton.textContent = "Female Characters"
femaleButton.addEventListener("click", () => {
  femaleCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    matchedDiv.className = "animated infinite bounce slow"
  })
})

let otherButton = document.createElement("button")
otherButton.textContent = "Other"
otherButton.addEventListener("click", () => {
  otherCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    matchedDiv.className = "animated infinite bounce slow"
  })
})

let resetButton = document.createElement("button")
resetButton.textContent = "Reset"
resetButton.addEventListener("click", () => {
  resetCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    matchedDiv.className = "animated fadeIn"
  })
})

mainHeader.appendChild(maleButton)
mainHeader.appendChild(femaleButton)
mainHeader.appendChild(otherButton)
mainHeader.appendChild(resetButton)

const maleCharacters = people.filter(person => person.gender === "male")
const femaleCharacters = people.filter(person => person.gender === "female")
const otherCharacters = people.filter(person => person.gender !== "female" && person.gender !== "male")
const resetCharacters = people.filter(person => person.gender)
// Filter Buttons for Characters End