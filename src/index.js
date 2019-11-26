let quoteListUL = document.querySelector("#quote-list")

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

  quoteLi.innerHTML = `<blockquote class="blockquote">
      <p class="mb-0">${quoteObj.quote}</p>
      <footer class="blockquote-footer">${quoteObj.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  `

  quoteListUL.append(quoteLi);
//   <li class='quote-card'>
//   <blockquote class="blockquote">
//     <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
//     <footer class="blockquote-footer">Someone famous</footer>
//     <br>
//     <button class='btn-success'>Likes: <span>0</span></button>
//     <button class='btn-danger'>Delete</button>
//   </blockquote>
// </li>
}
