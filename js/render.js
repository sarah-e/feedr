
export function renderArticleSummary(article){
  return `
<article class="article">
  <section class="featuredImage">
    <img src="${article.feature_image}" alt="" />
  </section>
  <section class="articleContent">
      <a href="#"><h3>${article.display_title}</h3></a>
      <h6>${article.channel}</h6>
  </section>
  <section class="impressions">
    ${article.shares.total}
  </section>
  <div class="clearfix"></div>
</article>
  `
}

export function renderFullArticle(selectedSource, article) {
  let render = x => ``
  switch(selectedSource){
    case 'Mashable':
      render = article => `
      <h1>${article.display_title}</h1>
      <p>
        ${article.content.plain}
      </p>
      <a href="${article.link}" class="popUpAction" target="_blank">Read more from source</a>
      `
      break;
    case 'Reddit':

      render = article => `
      <h1>${article.data.title}</h1>
      <p><img src="${article.data.preview.images[0].source.url}" width="300"></p>
      <a href="http://www.reddit.com${article.data.permalink}" class="popUpAction" target="_blank">Read more from source</a>
      `
      break;
    case 'Digg':

      render = article => `
      <h1>${article.content.title_alt}</h1>
      <p>Content here</p>
      <a href="${article.content.url}" class="popUpAction" target="_blank">Read more from source</a>
      `
      break;

  }
  return render(article)
}

export function renderArticles(selectedSource, article){
  let render = x => ``
  switch(selectedSource){
    case 'Mashable':
      render = article => `
      <article class="article">
        <section class="featuredImage">
          <img src="${article.feature_image}" alt="" />
        </section>
        <section class="articleContent">
            <a href="#"><h3>${article.display_title}</h3></a>
            <h6>${article.channel}</h6>
        </section>
        <section class="impressions">
          ${article.shares.total}
        </section>
        <div class="clearfix"></div>
      </article>
      `
      break;
    case 'Reddit':
    render = article => `
    <article class="article">
      <section class="featuredImage">
        <img src="${article.data.thumbnail}" alt="" />
      </section>
      <section class="articleContent">
          <a href="#"><h3>${article.data.title}</h3></a>
          <h6>${article.data.subreddit}</h6>
      </section>
      <section class="impressions">
        ${article.data.score}
      </section>
      <div class="clearfix"></div>
    </article>
    `
      break;
    case 'Digg':
    default:
    render = article => `
    <article class="article">
       <section class="featuredImage">
         <img src="${article.content.media.images[0].url}" alt="${article.content.title}" />
       </section>
       <section class="articleContent">
           <a href="#"><h3>${article.content.title_alt}</h3></a>
           <h6>${article.content.kicker}</h6>
       </section>
       <section class="impressions">
         ${article.digg_score}
       </section>
       <div class="clearfix"></div>
     </article>
    `
  }
  return render(article)
  //
  // let renderedArticles = []
  //
  // state.articles.forEach(article => {
  //   renderedArticles.push(render(article))
  // })
  //
  // doument.querySelector('#main').innerHTML = renderedArticles.join('/n')

}
