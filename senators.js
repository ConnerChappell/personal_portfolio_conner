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
let allSenators = []
let simpleSenators = []
let republicans = []
let democrats = []
let independents = []

const theData = getAPIData('/assets/senators.json').then(data => {
    allSenators = data.results[0].members
    simpleSenators = makeSimpleMap(allSenators)
    republicans = filterSenators(simpleSenators, "R")
    democrats = filterSenators(simpleSenators, "D")
    independents = filterSenators(simpleSenators, "ID")
    populateDOM(simpleSenators)
})

// map example
function makeSimpleMap(allOfThem) {
    let results = allOfThem.map(senator => {
        return {
            id: senator.id,
            name: `${senator.first_name} ${senator.last_name}`,
            party: senator.party,
            age: `${calculate_age(new Date(senator.date_of_birth))}`,
            state: senator.state,
            office: senator.office,
            phone: senator.phone,
            gender: senator.gender,
            total_votes: senator.total_votes,
            twitter: senator.twitter_account,
            senate_class: senator.senate_class,
            state_rank: senator.state_rank,
            seniority: senator.seniority
        }
    })
    return results
}

// filter example
function filterSenators(simpleList, partyAffiliation) {
    return simpleList.filter(senator => senator.party === partyAffiliation)
}

// reduce examples start
function totalVotes(senatorList) {
    const results = senatorList.reduce((acc, senator) => {
        return acc + senator.total_votes
    }, 0)
    return results
}

function oldestSenator(senatorList) {
    return senatorList.reduce((oldest, senator) => {
        return (oldest.age || 0) > senator.age ? oldest : senator
    }, {})
}
// reduce examples end

const container = document.querySelector('.container')

// Populates DOM with senators
function populateDOM(senator_array) {
    senator_array.forEach(senator => {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        let cardImage = document.createElement('div')
        cardImage.setAttribute('class', 'card-image')
        let figure = document.createElement('figure')
        figure.setAttribute('class', 'image')
        let figureImage = document.createElement('img')
        figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`
        figureImage.alt = 'Senator Portrait'
        // 404 error handling
        figureImage.addEventListener("error", event => {
            let noImage = event.target
            noImage.src = `images/merica.png`
          })

        figure.appendChild(figureImage)
        cardImage.appendChild(figure)
        card.appendChild(cardImage)
        card.appendChild(cardContent(senator))
        container.appendChild(card)
    })
}

// Card Content
function cardContent(senator) {
    let cardContent = document.createElement('div')
    cardContent.setAttribute('class', 'card-content')
    let media = document.createElement('div')
    media.setAttribute('class', 'media')
    let mediaLeft = document.createElement('div')
    mediaLeft.setAttribute('class', 'media-left')
    let figure = document.createElement('figure')
    figure.setAttribute('class', 'image is-96x96')
    let img = document.createElement('img')
    if(senator.party === "R") {
        img.src = `images/republican.png`
    }
    if(senator.party === "D") {
        img.src = `images/democrat.png`
    }
    if(senator.party === "ID") {
        img.src = `images/independent.png`
    }
    img.alt = 'Placeholder Image'

    let mediaContent = document.createElement('div')
    mediaContent.setAttribute('class', 'media-content')

    let titleP = document.createElement('p')
    titleP.setAttribute('class', 'title is-5')
    titleP.textContent = senator.name

    let subtitleP = document.createElement('p')
    subtitleP.setAttribute('class', 'subtitle is-6')
    subtitleP.textContent = senator.state

    let rank = document.createElement('p')
    rank.setAttribute('class', 'content')
    rank.textContent = `State Rank: ${senator.state_rank}`

    let contentDiv = document.createElement('div')
    contentDiv.setAttribute('class', 'content')
    contentDiv.textContent = `Senate Class: ${senator.senate_class}`

    let seniorityP = document.createElement('p')
    seniorityP.setAttribute('class', 'content')
    seniorityP.textContent = `Seniority: ${senator.seniority}`

    let ageP = document.createElement('p')
    ageP.textContent = `Age: ${senator.age}`

    mediaContent.appendChild(titleP)
    mediaContent.appendChild(subtitleP)
    figure.appendChild(img)
    mediaLeft.appendChild(figure)
    media.appendChild(mediaLeft)
    media.appendChild(mediaContent)

    contentDiv.appendChild(rank)
    contentDiv.appendChild(seniorityP)
    contentDiv.appendChild(ageP)
    cardContent.appendChild(media)
    cardContent.appendChild(contentDiv)
    return cardContent
}

// Calculates age of senators
function calculate_age(dob) { 
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
function sortSenatorsByAge(senatorList) {
    return senatorList.sort(function(a, b) {
      return a.age - b.age;
    });
  }




  
