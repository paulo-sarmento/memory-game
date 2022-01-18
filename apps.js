const section = document.querySelector('section')
const playerLivesCount = document.querySelector('span')
let playerLives = 6

playerLivesCount.textContent = playerLives

const getData = () => [
    { imgSrc: "./images/beatles.jpeg", name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", name: "joy division" },
    { imgSrc: "./images/metallica.jpeg", name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", name: "pink floyd" },
    { imgSrc: "./images/beatles.jpeg", name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", name: "led zeppelin" },
    { imgSrc: "./images/ledzep.jpeg", name: "led zeppelin" },
    { imgSrc: "./images/metallica.jpeg", name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", name: "pink floyd" },
]

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - 0.5)  //randomize the arr of objects
    return cardData;
}

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize()
    //Generate the HTML
    cardData.forEach(item => {
        const card = document.createElement('div')
        const face = document.createElement('img')
        const back = document.createElement('div')
        card.classList = 'card'
        face.classList = 'face'
        back.classList = 'back'
        face.src = item.imgSrc
        card.setAttribute('name', item.name)
        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard')
            checkCards(e)
        })
    })
}

//Check cards
const checkCards = (e) => {
    const clickedCard = e.target //captura o card que o usuário clicou
    clickedCard.classList.add('flipped')
    clickedCard.style.pointerEvents = 'none'
    const flippedCards = document.querySelectorAll('.flipped')
    const togleCard = document.querySelectorAll('.togleCard')

    if(flippedCards.length === 2) {
        section.style.pointerEvents = 'none'

        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                card.style.pointerEvents = 'none' //seta o card para não ser clicado
                setTimeout(() => section.style.pointerEvents = 'all', 1000)
            })
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                card.style.pointerEvents = 'all'
                setTimeout(() => card.classList.remove('toggleCard'), 1000)
                setTimeout(() => section.style.pointerEvents = 'all', 1000)
            })
            playerLives--
            playerLivesCount.textContent = playerLives
            if(playerLives === 0) {
                setTimeout(() => restart('try again'), 1000)
            }
        }
    }
    if(togleCard.lengh === 16) {
        setTimeout(() => restart('You won'), 1000)
    }
}

const restart = (text) => {
    let cardData = randomize()
    let faces = document.querySelectorAll('.face')
    let cards = document.querySelectorAll('.card')
    section.style.pointerEvents = 'none'
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard')

        setTimeout(() => {
            cards[index].style.pointerEvents = 'all'
            faces[index].src = item.imgSrc
            cards[index].setAttribute('name', item.name)
            section.style.pointerEvents = 'all'
        },1000)
    })
    playerLives = 6
    playerLivesCount.textContent = playerLives
    setTimeout(() => window.alert(text), 100)
}

cardGenerator()