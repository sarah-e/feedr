/*
  Please add all Javascript code to this file.
*/

let state = {
  articles: [],
  selectedSource: 'Mashable'
}

let popUp = document.querySelector('#popUp')

import math, {add, subtract} from './math'
import {renderArticles, renderArticleSummary, renderFullArticle} from './render'
import fetchArticles from './fetch'

fetchArticles(state.selectedSource)
.then(articles => {
  state.articles = articles
}).then(() => {
  let articleList = []
  // let thisArticle = renderArticles(state.selectedSource, state.articles[0])
  state.articles.forEach(article => {
    articleList.push(renderArticles(state.selectedSource, article))
  })
  // console.log(articleList);
  document.querySelector('#main').innerHTML = articleList.join('\n')
}).catch(err => {
  alert('Cannot load feed')
  console.log('Something went wrong', err)
})

popUp.classList.remove('hidden')
console.log('remove hidden')
window.addEventListener('load', hideLoading)

function hideLoading(){
    window.setTimeout(function(){
      popUp.classList.add('hidden')
      console.log('add hidden')
    }, 1000)
}

let search = document.querySelector('#search')


document.querySelector('body').addEventListener('keyup', event => {
    event.preventDefault();
    // toggle search when enter is pressed
    if (event.keyCode == 13) {
        search.classList.toggle('active')
    }
    // close popup when esc is pressed
    if (event.keyCode == 27) {
        popUp.classList.add('hidden')
    }
})

document.querySelector('body').addEventListener('click', event => {

  // toggle search when icon is clicked
  if (event.target.matches('#search a') || event.target.matches('#search img')){
    console.log(event.target);
    search.classList.toggle('active')
  }

  if (event.target.matches('body') && search.classList.contains('active')){
    search.classList.remove('active')
  }


  if (event.target.matches('h3')){
    // open popUp
    console.log(event.target);
    popUp.classList.toggle('hidden')
    popUp.classList.remove('loader')
    //insert correct article
    // console.dir(event.target.innerHTML);
    console.log(state.articles)
    // insert html
    let article = state.articles.find(article => {
      switch (state.selectedSource) {
        case 'Reddit':
          // console.log(article.data.title);
          return article.data.title === event.target.innerHTML
          break;
        case 'Mashable':
          // console.log(article.display_title);
          return article.display_title === event.target.innerHTML
          break;
        case 'Digg':
          // console.log(article.display_title);
          return article.content.title_alt === event.target.innerHTML
          break;
      }


    })

    document.querySelector('#popUp .container').innerHTML = renderFullArticle(state.selectedSource, article)

  }
  if (event.target.matches('.closePopUp')){
    popUp.classList.toggle('hidden')
  }

  if (event.target.matches('.nav-item')){
    // console.log(event.target);
    // Save what they selected in the state
    state.selectedSource = event.target.innerHTML
    // Fetch articles from the new source

  }
  fetchArticles(state.selectedSource)
  .then(articles => {
    state.articles = articles
  })
  .then(() => {
    let articleList = []
    // let thisArticle = renderArticles(state.selectedSource, state.articles[0])
    state.articles.forEach(article => {
      articleList.push(renderArticles(state.selectedSource, article))
    })
    // console.log(articleList);
    document.querySelector('#main').innerHTML = articleList.join('\n')

  })


})





// todo
// Replace dummy data in article template

// Pseuodo
// Grab all articles from a source
// Get the array
// Loop over the articles and call our render function
// Add the result of the render function to an Array
// Join the Array
// Set the HTML of our #main div to the result of our joined Array


// todos


//todo
//Psuedo - Switching source - is it digg, mashable etc
// When a user selects something from the dropdown
// Save what they selected in the state
// Fetch articles from the new source
// Render the articles in our list


// Make sure the view article source
