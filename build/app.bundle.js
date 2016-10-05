/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _math = __webpack_require__(1);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('Hello'); /*
	                        Please add all Javascript code to this file.
	                      */

	console.log('Hello 2');
	console.log((0, _math.add)(1, 2));
	console.log((0, _math.subtract)(1, 2));
	console.log((0, _math2.default)());

	function renderArticleSummary(article) {
	  return '\n<article class="article">\n  <section class="featuredImage">\n    <img src="' + article.feature_image + '" alt="" />\n  </section>\n  <section class="articleContent">\n      <a href="#"><h3>' + article.display_title + '</h3></a>\n      <h6>' + article.channel + '</h6>\n  </section>\n  <section class="impressions">\n    ' + article.shares.total + '\n  </section>\n  <div class="clearfix"></div>\n</article>\n\n  ';
	}

	function renderFullArticle(article) {
	  return '\n<h1>' + article.display_title + '</h1>\n<p>\n  ' + article.content.plain + '\n</p>\n<a href="' + article.link + '" class="popUpAction" target="_blank">Read more from source</a>\n  ';
	}

	var state = {
	  articles: [],
	  selectedSource: ''
	};

	function fetchArticles() {
	  var url = '';
	  var parse = function parse(x) {
	    return x;
	  };
	  switch (state.selectedSource) {
	    case 'Mashable':
	      url = 'http://mashable.com/stories.json';
	      parse = function parse(data) {
	        return data.hot;
	      };
	      break;
	    case 'Reddit':
	      url = 'https://www.reddit.com/top.json';
	      parse = function parse(data) {
	        return data.data.children;
	      };
	      break;
	    case 'Digg':
	      // default:
	      url = 'http://digg.com/api/news/popular.json';
	      parse = function parse(data) {
	        return data.data.feed;
	      };
	    // parse = data => data.data.children
	  }

	  fetch('https://accesscontrolalloworiginall.herokuapp.com/' + url).then(function (res) {
	    return res.json();
	  }).then(parse).then(function (articles) {
	    return state.articles = articles;
	  });
	  // .then(articles => {
	  //
	  //   state.articles = articles
	  //
	  //   let renderedArticles = []
	  //   articles.forEach(article => {
	  //     renderedArticles.push(renderArticleSummary(article))
	  //   })
	  //   document.querySelector('#main').innerHTML = renderedArticles.join('\n')
	  // })
	}

	fetchArticles();

	function renderArticles() {
	  var render = function render(x) {
	    return '';
	  };
	  switch (state.selectedSource) {
	    case 'Mashable':
	      render = function render(article) {
	        return '\n      <article class="article">\n        <section class="featuredImage">\n          <img src="' + article.feature_image + '" alt="" />\n        </section>\n        <section class="articleContent">\n            <a href="#"><h3>' + article.display_title + '</h3></a>\n            <h6>' + article.channel + '</h6>\n        </section>\n        <section class="impressions">\n          ' + article.shares.total + '\n        </section>\n        <div class="clearfix"></div>\n      </article>\n      ';
	      };
	      break;
	    case 'Reddit':
	      render = function render(article) {
	        return '\n    <article class="article">\n      <section class="featuredImage">\n        <img src="' + article.thumbnail + '" alt="" />\n      </section>\n      <section class="articleContent">\n          <a href="#"><h3>' + article.title + '</h3></a>\n          <h6>' + article.channel + '</h6>\n      </section>\n      <section class="impressions">\n        ' + article.score + '\n      </section>\n      <div class="clearfix"></div>\n    </article>\n    ';
	      };
	      break;
	    case 'Digg':
	    default:
	      render = function render(article) {
	        return '\n    <article class="article">\n      <section class="featuredImage">\n        <img src="' + article.thumbnail + '" alt="" />\n      </section>\n      <section class="articleContent">\n          <a href="#"><h3>' + article.title + '</h3></a>\n          <h6>' + article.channel + '</h6>\n      </section>\n      <section class="impressions">\n        ' + article.score + '\n      </section>\n      <div class="clearfix"></div>\n    </article>\n    ';
	      };
	  }
	  var renderedArticles = [];
	  state.articles.forEach(function (article) {
	    renderedArticles.push(render(article));
	  });

	  doument.querySelector('#main').innerHTML = renderedArticles.join('/n');
	}

	document.querySelector('body').addEventListener('click', function (event) {
	  var popUp = document.querySelector('#popUp');
	  if (event.target.matches('h3')) {
	    // open popUp
	    // console.log(event.target);
	    popUp.classList.toggle('hidden');
	    popUp.classList.remove('loader');
	    //insert correct article
	    console.dir(event.target.innerHTML);
	    console.log(state.articles);
	    // insert html
	    var article = state.articles.find(function (article) {
	      return article.display_title === event.target.innerHTML;
	    });

	    document.querySelector('#popUp .container').innerHTML = renderFullArticle(article);
	  }
	  if (event.target.matches('.closePopUp')) {
	    popUp.classList.toggle('hidden');
	  }

	  if (event.target.matches('.nav-item')) {
	    // console.log(event.target);
	    // Save what they selected in the state
	    state.selectedSource = event.target.innerHTML;
	    // Fetch articles from the new source
	    fetchArticles();
	  }
	});

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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.add = add;
	exports.subtract = subtract;
	exports.default = math;
	function add(x, y) {
	  return x + y;
	}

	function subtract(x, y) {
	  return x - y;
	}

	function math() {
	  return 'math is fun';
	}

/***/ }
/******/ ]);