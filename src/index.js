let quoteListUL = document.querySelector("#quote-list")
let newForm = document.querySelector("#new-quote-form")

fetch("http://localhost:3000/quotes?_embed=likes")
  .then(r => r.json())
  .then((quotesArr) => {

    quotesArr.forEach((quoteObj) => {
      turnObjToHTML(quoteObj);
    })

  })


newForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let newQuote = evt.target["new-quote"].value
  let newAuthor = evt.target["author"].value

  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({
      quote: newQuote,
      author: newAuthor
    })
  })
  .then(r => r.json())
  .then((quoteObj) => {
    quoteObj.likes = []
    turnObjToHTML(quoteObj)
  })

})


function turnObjToHTML(quoteObj){
  let quoteLi = document.createElement("li")
    quoteLi.className = "quote-card"
    // quoteLi.dataset.keenan = 1
    // quoteLi's dataset object looks like this: {keenan: "1"}

  quoteLi.innerHTML = `<blockquote class="blockquote">
      <p class="mb-0">${quoteObj.quote}</p>
      <footer class="blockquote-footer">${quoteObj.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  `

  quoteListUL.append(quoteLi);



  let deleteButton = quoteLi.querySelector(".btn-danger")
  let likeButton = quoteLi.querySelector(".btn-success")
  let likeSpan = quoteLi.querySelector("span")

  deleteButton.addEventListener("click", () => {

    fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then((blankObj) => {
      quoteLi.remove()
    })

  })

  likeButton.addEventListener("click", () => {

    fetch('http://localhost:3000/likes', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        quoteId: quoteObj.id
      })
    })
    .then(r => r.json())
    .then((like) => {
      quoteObj.likes.push(like) //similar to adding 1 to stuff in JS memory
      likeSpan.innerText = quoteObj.likes.length
    })

  })

}


// BONUS: The things we can do with JS!

let firstDiv = document.querySelector("div")

let searchInput = document.createElement("input")
searchInput.type = "text"
searchInput.placeholder = "Write a quote"

firstDiv.prepend(searchInput)

searchInput.addEventListener("input", (evt) => {
  let allQuotes = document.querySelectorAll(".quote-card")
  let userInput = evt.target.value

  allQuotes.forEach((quoteLi) => {

    let text = quoteLi.querySelector("p").innerText

     quoteLi.style.display = text.includes(userInput) ? "" :  "none"
     // text.includes(userInput) ? quoteLi.style.display =  "" : quoteLi.style.display =  "none"


   })
})























//
