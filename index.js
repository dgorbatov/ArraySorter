(function () {
  let numbers = [];

  window.addEventListener("load", init);

  function init() {
    numbers = createNumbers(20, 100);
    setEventListeners();
    createDiv();
  }

  function setEventListeners() {
    qsa("#controls input").forEach(input => input.addEventListener("input", updateInput))
    id("sort").addEventListener("submit", sortData)
  }

  function sortData(form) {
    form.preventDefault();
    insertionSort();
  }

  function insertionSort() {
    for (let i=1; i < numbers.length; ++i) {
      for (let j=i; j > -1; --j) {
        if (numbers[j-1] > numbers[j]) {
          let tmp = numbers[j-1];
          numbers[j-1] = numbers[j];
          numbers[j] = tmp;
        } else {
          break;
        }
      }
    }
        
    createDiv();
    console.log(numbers);
  }

  function updateInput(input) {
    changeInput(input);
    createDiv();
  }

  function changeInput(input) {
    input.target.parentNode.children[0].textContent =
        input.target.parentNode.children[0].textContent.split(":")[0] +
        ": " +
        input.target.value;
    numbers = createNumbers(qsa("#controls input")[0].value,
                            qsa("#controls input")[1].value);
  }

  function createNumbers(num, max) {
    let ret = [];
    for (let i=0; i < num; ++i) {
      ret.push(Math.floor(Math.random() * max));
    }
    return ret;
  }

  function createDiv() {
        d3.select("#graph")
          .selectAll("div").remove();

    const graph = d3.select("#graph")
      .selectAll("div")
      .data(numbers);

    graph.join(
      enter => 
        enter
         .append("div")
         .style("background-color",
                data => (
                  "#" + Math.floor(
                  (data / qsa("#controls input")[1].value)*16777215).toString(16)
          ))
        .style("height", data => (
          (data / qsa("#controls input")[1].value) * 70) + "vh"
        )
        .style("width", () => (
          (30 / qsa("#controls input")[0].value)) + "vw"
        ),
      update =>
        update.style("width", () => (
          (30 / qsa("#controls input")[0].value)) + "vw"
        ),
      exit =>
        exit.remove()
    );
  }


  /* Helper Functions */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
   function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();