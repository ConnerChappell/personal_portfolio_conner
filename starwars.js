import { people } from '/assets/people.js'

console.log("I am JavaScript running in your page!")

let mainArea = document.querySelector("main")

people.forEach((person) => {
  let personDiv = document.createElement("div")
  let name = document.createElement("h2")
  let gender = document.createElement("p")
  let pic = document.createElement("img")

  let charNum = getCharNumber(person.url)

  name.textContent = person.name
  gender.textContent = person.gender
  pic.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`

  personDiv.appendChild(name)
  personDiv.appendChild(gender)
  personDiv.appendChild(pic)

  mainArea.appendChild(personDiv)
});

function getCharNumber(charURL) {
  let end = charURL.lastIndexOf("/")
  let charID = charURL.substring(end - 2, end)
  if (charID.indexOf("/") !== -1) {
    return charID.slice(1, 2)
  } else {
    return charID
  }
}

// Filter Buttons
const allDivs = Array.from(document.querySelectorAll("div"))
const mainHeader = document.querySelector("header")

let maleButton = document.createElement("button")
maleButton.textContent = "Male Characters"
maleButton.addEventListener("click", () => {
  femaleCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    matchedDiv.setAttribute("style", "display: none;")
  })
})

let femaleButton = document.createElement("button")
femaleButton.textContent = "Female Characters"
femaleButton.addEventListener("click", () => {
  maleCharacters.forEach(character => {
    let matchedDiv = allDivs.find(oneDiv => {
      return oneDiv.firstChild.textContent === character.name
    })
    matchedDiv.setAttribute("style", "display: none;")
  })
})

mainHeader.appendChild(maleButton)
mainHeader.appendChild(femaleButton)

const maleCharacters = people.filter(person => person.gender === "male")
const femaleCharacters = people.filter(person => person.gender === "female")
const otherCharacters = people.filter(person => person.gender !== "female" && person.gender !== "male")