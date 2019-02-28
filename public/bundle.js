/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

// import {
//   displayFilters,
//   filters,
//   createFilter,
//   makeFilterActive
// } from "./filter.js";
// import {
//   createAllMoviesCards,
//   createContainer,
//   films,
//   createFilmCard
// } from "./films.js";

// displayFilters(filters, createFilter, makeFilterActive);

// createContainer("Top rated", 2, 3);
// createContainer("Most commented", 4, 5);
// createAllMoviesCards(films, createFilmCard);
const films = [
  {
    name: "The Assassination Of Jessie James By The Coward Robert Ford",
    text:
      "A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.",
    link: "./images/posters/three-friends.jpg",
    btns: true,
    controls: true
  },
  {
    name: "Incredibles 2",
    text:
      "A priests Romania and confront a malevolent force in the form of a demonic nun.",
    link: "./images/posters/moonrise.jpg",
    btns: true,
    controls: true
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/fuga-da-new-york.jpg",
    controls: false
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/blue-blazes.jpg",
    controls: false
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/accused.jpg",
    controls: false
  },
  {
    name: false,
    text: false,
    btns: false,
    link: "./images/posters/blackmail.jpg",
    controls: false
  }
];
//create card fro template
const createFilmCard = (nameOfCLass, text, btns, link, name) => {
  const card = document
    .querySelector(".card-template")
    .content.querySelector(".film-card")
    .cloneNode(true);
  if (!nameOfCLass) {
    card.className += ` film-card--no-controls`;
  }
  const filmDescription = card.querySelector(".film-card__description");
  if (name) {
    const filmTitle = card.querySelector(".film-card__title");
    filmTitle.textContent = name;
  }
  if (!text) {
    filmDescription.textContent = "";
  } else {
    filmDescription.textContent = text;
  }
  if (!btns) {
    card.remove(".film-card__controls");
  }
  const image = card.querySelector(".film-card__poster");
  image.src = link;
  return card;
};

// const res = films.reduce((acc, elm) => {
//   acc.push(
//     createFilmCard(elm.controls, elm.text, elm.btns, elm.link, elm.name)
//   );
//   return acc;
// }, []);
// console.log(res);
// let index = 0;
// const allcontainers = Array.from(
//   document.querySelectorAll(".films-list__container")
// );

// allcontainers.forEach(container => {
//   for (let i = index; i <= index <= 2; i++) {
//     const filmCard = res[index];
//     container.appendChild(filmCard);
//   }

//   index += 2;
// });
console.log("here");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map