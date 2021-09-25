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

    if( id("insertion").checked) {
      insertionSort();
    }

    if( id("bubble").checked) {
      bubbleSort();
    }

    if( id("quick").checked) {
      quickSort();
    }
  }

  async function quickSort() {
    numbers = await quickSortRec(numbers, 0, numbers.length - 1);
  }

  async function quickSortRec(items, left, right) {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        createDivFromArray(items);
        await sleep(10);
        if (left < index - 1) {
          await quickSortRec(items, left, index - 1);
        }
        if (index < right) {
          await quickSortRec(items, index, right);
        }
    }
    return items;
  }

  function partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)];

    let i = left;
    let j = right;

    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }

      while (items[j] > pivot) {
        j--;
      }

      if (i <= j) {
        let tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
        // swap(id("graph").children[i], id("graph").children[j]);

        i++;
        j--;
      }
    }

    return i;
  }

  async function bubbleSort() {
    let swapped = false;

    do {
      swapped = false;
      for (let i=1; i < numbers.length; ++i) {
        if (numbers[i-1] > numbers[i]) {
          let tmp = numbers[i-1];
          numbers[i-1] = numbers[i];
          numbers[i] = tmp;
          swap(id("graph").children[i], id("graph").children[i+1]);

          swapped = true;
          await sleep(10);
        }
      }
    } while (swapped)
  }

  async function insertionSort() {
    for (let i=1; i < numbers.length; ++i) {
      for (let j=i; j > -1; --j) {
        if (numbers[j-1] > numbers[j]) {
          let tmp = numbers[j-1];
          numbers[j-1] = numbers[j];
          numbers[j] = tmp;
          swap(id("graph").children[j], id("graph").children[j+1]);

          await sleep(10);
        } else {
          break;
        }
      }
    }

    console.log(numbers);
  }

  function updateInput(input) {
    changeInput(input);

    if (input.target.parentNode.children[0].textContent.split(":")[0] !== "Delay") {
      createDiv();
    }
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
    id("graph").innerHTML = "";

    let header = gen("h1")
    header.textContent = "Welcome To Number Sorter"
    id("graph").appendChild(header);

    for (let i of numbers) {
      let bar = gen("div");
      bar.style.backgroundColor = "#" + Math.floor(
                  (i / qsa("#controls input")[1].value)*16777215).toString(16)
      bar.style.height = ((i / qsa("#controls input")[1].value) * 70) + "vh";

      bar.style.width = (30 / qsa("#controls input")[0].value) + "vw";

      id("graph").appendChild(bar);
    }
  }

  function createDivFromArray(items) {
    id("graph").innerHTML = "";

    let header = gen("h1")
    header.textContent = "Welcome To Number Sorter"
    id("graph").appendChild(header);

    for (let i of items) {
      let bar = gen("div");
      bar.style.backgroundColor = "#" + Math.floor(
                  (i / qsa("#controls input")[1].value)*16777215).toString(16)
      bar.style.height = ((i / qsa("#controls input")[1].value) * 70) + "vh";

      bar.style.width = (30 / qsa("#controls input")[0].value) + "vw";

      id("graph").appendChild(bar);
    }
  }

  function swap(node1, node2) {
      const afterNode2 = node2.nextElementSibling;
      const parent = node2.parentNode;
      node1.replaceWith(node2);
      parent.insertBefore(node1, afterNode2);
  }

  function sleep(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
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