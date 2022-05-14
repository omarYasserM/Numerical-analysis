function f(x) {
  var value = document.getElementById("fx").value.toLowerCase();
  var eqn = math.compile(value);
  var result = eqn.eval({
    x: x,
  });
  return result;
}

const df = (x) => {
  return math
    .derivative(document.getElementById("fx").value.toLowerCase(), "x")
    .eval({ x: x });
};

//*------------------------------------------------------------------------- bisection

const bisection = (xl, xu, maxError, maxItter = 100) => {
  if (f(xl) * f(xu) >= 0) {
    console.log("You have not assumed" + " right a and b");
    return;
  }

  let xr = 100;
  let xrOld = 0;
  let i = 1;
  let results = [];

  while (Math.abs((xr - xrOld) / xr) * 100 >= maxError && i <= maxItter) {
    // Find middle point
    results.push(i);
    results.push(xl.toFixed(4));
    results.push(f(xl).toFixed(4));
    results.push(xu.toFixed(4));
    results.push(f(xu).toFixed(4));

    xrOld = xr;
    xr = (xl + xu) / 2;
    results.push(xr.toFixed(4));
    results.push(f(xr).toFixed(4));
    if (i !== 1) results.push((Math.abs((xr - xrOld) / xr) * 100).toFixed(2));
    else results.push("---");
    // Check if middle point is root
    if (f(xr) == 0.0) break;
    // Decide the side to repeat the steps
    else if (f(xr) * f(xl) < 0) xu = xr;
    else xl = xr;
    i++;
    mapDataToTable(results);
    results = [];
  }
  mapDataToTable(["<b>root</b>", xr.toFixed(4)]);
  //prints value of c upto 4 decimal places
};

//*------------------------------------------------------------------------- False position
const falsePosition = (xl, xu, maxError, maxItter = 100) => {
  if (f(xl) * f(xu) >= 0) {
    console.log("You have not assumed" + " right a and b");
    return;
  }
  let results = [];

  let xr = xl;
  let xrOld = 0;

  let i = 0;

  while (Math.abs((xr - xrOld) / xr) * 100 >= maxError && i < maxItter) {
    results.push(i);
    results.push(xl.toFixed(4));
    results.push(f(xl).toFixed(4));
    results.push(xu.toFixed(4));
    results.push(f(xu).toFixed(4));
    // Find middle point
    xrOld = xr;
    xr = xu - (f(xu) * (xl - xu)) / (f(xl) - f(xu));
    results.push(xr.toFixed(4));
    results.push(f(xr).toFixed(4));
    // Check if middle point is root
    if (i !== 1) results.push((Math.abs((xr - xrOld) / xr) * 100).toFixed(2));
    else results.push("---");
    if (f(xr) == 0.0) break;
    // Decide the side to repeat the steps
    else if (f(xr) * f(xl) < 0) xu = xr;
    else xl = xr;
    i++;
    mapDataToTable(results);
    results = [];
  }
  //prints value of c upto 4 decimal places
  mapDataToTable(["<b>root</b>", xr.toFixed(4)]);
};

//*------------------------------------------------------------------------- Fixed position

const simpleFixedPoint = (x, maxError, maxItter = 100) => {
  let results = [];

  let xOld = 0;
  let i = 0;
  while (Math.abs((x - xOld) / x) * 100 >= maxError && i < maxItter) {
    results.push(i);
    results.push(x.toFixed(4));
    results.push(f(x).toFixed(4));
    if (i !== 1) results.push((Math.abs((x - xOld) / x) * 100).toFixed(2));
    else results.push("---");
    xOld = x;
    x = f(x);
    i++;
    mapDataToTable(results);
    results = [];
  }
  mapDataToTable(["<b>root</b>", x.toFixed(4)]);
};

//*------------------------------------------------------------------------- Newton

const newton = (x, maxError, maxItter = 100) => {
  let h;
  let xOld = 0;
  let i = 0;
  let results = [];

  while (Math.abs((x - xOld) / x) * 100 >= maxError && i < maxItter) {
    results.push(i);
    results.push(x.toFixed(4));
    results.push(f(x).toFixed(4));
    results.push(df(x).toFixed(4));
    if (i !== 1) results.push((Math.abs((x - xOld) / x) * 100).toFixed(2));
    else results.push("---");
    h = f(x) / df(x);
    // x(i+1) = x(i) - f(x) / f'(x)
    xOld = x;
    x = x - h;
    i++;
    mapDataToTable(results);
    results = [];
  }
  mapDataToTable(["<b>root</b>", x.toFixed(4)]);
};

//*------------------------------------------------------------------------- Secent

const secant = (x1, x2, maxError, maxItter = 100) => {
  let i = 0,
    xm,
    x0,
    c;
  let results = [];

  if (f(x1) * f(x2) < 0) {
    do {
      results.push(i);
      // calculate the intermediate value
      x0 = (x1 * f(x2) - x2 * f(x1)) / (f(x2) - f(x1));
      results.push(x1.toFixed(4));
      results.push(f(x1).toFixed(4));

      results.push(x2.toFixed(4));
      results.push(f(x2).toFixed(4));

      // check if x0 is root of equation or not
      c = f(x1) * f(x0);

      // update the value of interval
      x1 = x2;
      x2 = x0;

      // update number of iteration
      i++;

      // if x0 is the root of equation then break the loop
      if (c == 0) break;
      xm = (x1 * f(x2) - x2 * f(x1)) / (f(x2) - f(x1));
      if (i !== 1) results.push((Math.abs(xm - x0) * 100).toFixed(2));
      else results.push("---");
      mapDataToTable(results);
      results = [];
    } while (Math.abs(xm - x0) * 100 >= maxError && i < maxItter);
    results.push(i);
    x0 = (x1 * f(x2) - x2 * f(x1)) / (f(x2) - f(x1));
    results.push(x1.toFixed(4));
    results.push(f(x1).toFixed(4));
    results.push(x2.toFixed(4));
    results.push(f(x2).toFixed(4));
    results.push((Math.abs(xm - x0) * 100).toFixed(2));
    mapDataToTable(results);
    // until the convergence
    mapDataToTable(["<b>root</b>", x2.toFixed(4)]);
  } else console.log("Can not find a root in the given interval");
};

//*------------------------------------------------------------------------- DOM manip -  change method
const myTable = document.getElementById("table-of-results");
const mySelect = document.getElementById("method-selector");
const myClear = document.getElementById("clear-btn");
const myCalc = document.getElementById("calc-btn");
const fx = document.getElementById("fx");
const xl = document.getElementById("xl");
const xu = document.getElementById("xu");
const x = document.getElementById("x");
const xi1 = document.getElementById("xi1");
const maxError = document.getElementById("maxError");

myCalc.addEventListener("click", (e) => {
  e.preventDefault();
  switch (mySelect.value) {
    case "0":
      bisection(
        parseFloat(xl.value),
        parseFloat(xu.value),
        parseFloat(maxError.value)
      );
      break;
    case "1":
      falsePosition(
        parseFloat(xl.value),
        parseFloat(xu.value),
        parseFloat(maxError.value)
      );
      break;
    case "2":
      simpleFixedPoint(parseFloat(x.value), parseFloat(maxError.value));
      break;
    case "3":
      newton(parseFloat(x.value), parseFloat(maxError.value));
      break;
    case "4":
      secant(
        parseFloat(x.value),
        parseFloat(xi1.value),
        parseFloat(maxError.value)
      );
      break;
  }
});

const hideAllInput = () => {
  const inputs = document.getElementsByTagName("input");
  let i = inputs.length;
  while (i > 0) inputs[--i].style.display = "none";
};

myClear.addEventListener("click", (e) => {
  e.preventDefault();
  myTable.innerHTML = "";
  document.getElementById("my-form").reset();
  mapHeadersToTable(headers[mySelect.value]);
});
mySelect.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "0":
      hideAllInput();
      fx.style.display = "inline";
      xl.style.display = "inline";
      xu.style.display = "inline";
      maxError.style.display = "inline";
      break;
    case "1":
      hideAllInput();
      fx.style.display = "inline";
      xl.style.display = "inline";
      xu.style.display = "inline";
      maxError.style.display = "inline";
      break;
    case "2":
      hideAllInput();
      fx.style.display = "inline";
      x.style.display = "inline";
      maxError.style.display = "inline";
      break;
    case "3":
      hideAllInput();
      fx.style.display = "inline";
      x.style.display = "inline";
      maxError.style.display = "inline";
      break;
    case "4":
      hideAllInput();
      fx.style.display = "inline";
      x.style.display = "inline";
      xi1.style.display = "inline";
      maxError.style.display = "inline";
      break;
  }
  e.preventDefault();
  const myTable = document.getElementById("table-of-results");
  myTable.innerHTML = "";
  mapHeadersToTable(headers[e.target.value]);
});

//*------------------------------------------------------------------------- DOM manip - render results

const headers = [
  ["i", "xl", "fxl", "xu", "fxu", "xr", "fxr", "error"],
  ["i", "xl", "fxl", "xu", "fxu", "xr", "fxr", "error"],
  ["i", "xl", "fxl", "error"],
  ["i", "xi", "fxi", "f`xi", "error"],
  ["i", "xi-1", "f(xi-1)", "xi", "fxi", "error"],
];

const mapHeadersToTable = (head) => {
  let headHTML = "<tr>";
  head.forEach((item) => (headHTML += `<th>${item}</th>`));
  myTable.innerHTML += headHTML + "</tr>";
};

const mapDataToTable = (data) => {
  dataHTML = "";
  myTable.innerHTML += "<tr>";
  data.forEach((item) => {
    dataHTML += `<td>${item}</td>`;
  });
  myTable.innerHTML += dataHTML + "</tr>";
};
mapHeadersToTable(headers[0]);
hideAllInput();
fx.style.display = "inline";
xl.style.display = "inline";
xu.style.display = "inline";
maxError.style.display = "inline";
