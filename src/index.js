let quoteListUL = document.querySelector("#quote-list")
let form = document.querySelector("#new-quote-form")

fetch("http://localhost:3000/quotes?_embed=likes")
  .then(r => r.json())
  .then((quotesArr) => {

    quotesArr.forEach((quoteObj) => {
      turnObjToHTML(quoteObj);
    })

  })

function turnObjToHTML(quoteObj){
  let quoteLi = document.createElement("li")
    quoteLi.className = "quote-card"

  let blockquote = document.createElement("blockquote")
    blockquote.className = "blockquote"

  let quoteP = document.createElement("p")
    quoteP.innerText = quoteObj.quote
    quoteP.className = "mb-0"

  let authorFooter = document.createElement("footer")
    authorFooter.innerText = quoteObj.author
    authorFooter.className = "blockquote-footer"

  let lineBreak = document.createElement("br")

  let likeButton = document.createElement("button")
    likeButton.className = "btn-success"

  let likesSpan = document.createElement("span")
    likesSpan.innerText = quoteObj.likes.length

  let deleteButton = document.createElement("button")
    deleteButton.className = "btn-danger"
    deleteButton.innerText = "Delete"




  quoteLi.append(blockquote)
  blockquote.append(quoteP, authorFooter, lineBreak, likeButton, deleteButton)
  // likeButton.append("Likes: ", likesSpan)
  likeButton.innerText = "Likes: "
  likeButton.append(likesSpan)

  quoteListUL.append(quoteLi)

  quoteListUL.append(quoteLi)


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
      likesSpan.innerText = quoteObj.likes.length
    })

  })













}




form.addEventListener("submit", (evt) => {
  evt.preventDefault()
})
