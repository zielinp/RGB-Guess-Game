// Some random colors
const colors = [
  "#ff0560",
  "#00ff00",
  "#0000ff",
  "#f00080",
  "#f0f0f0",
  "#00000f",
];

const numBalls = 75;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 6,
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` },
    ],
    {
      duration: (Math.random() + 1) * 4000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});

var r = 0;
var g = 0;
var b = 0;

var userRed = 0;
var userGreen = 0;
var userBlue = 0;

var liczbaProb = 3;
var tablicaWynikow = [0, 0, 0];

function losujKolor() {
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  var kolor = "rgb(" + r + "," + g + "," + b + ")";
  $("#box").css("background", kolor);
  //$(".wylosowaneWartosci").text(kolor);

  $("#zatwierdz").css({ opacity: "100%", cursor: "pointer" });
  document.getElementById("zatwierdz").disabled = false;

  $("#losuj").css({ opacity: "60%", cursor: "not-allowed" });
  document.getElementById("losuj").disabled = true;

  wyczyscPola();
}

function pobierzOdpowiedzi() {
  result = true;
  userRed = document.getElementById("redValue").value;
  userGreen = document.getElementById("greenValue").value;
  userBlue = document.getElementById("blueValue").value;

  if (userRed < 0 || userRed > 255) {
    result = false;
  }
  if (userGreen < 0 || userGreen > 255) {
    result = false;
  }
  if (userBlue < 0 || userBlue > 255) {
    result = false;
  }
  return result;
}

function sprawdzOdpowiedz() {
  var deltaRed = Math.abs(r - userRed);
  var deltaGreen = Math.abs(g - userGreen);
  var deltaBlue = Math.abs(b - userBlue);
  var delta = deltaRed + deltaGreen + deltaBlue;
  tablicaWynikow[liczbaProb] = przyznajPunkty(delta);
  $("#wynik").text("Twój wynik to: " + tablicaWynikow[liczbaProb]);
}

function przyznajPunkty(d) {
  var punkty = ((765 - d) / 765) * 100;
  punkty = (Math.round(punkty * 100) / 100).toFixed(2);

  console.log("Twoje punkty: ", punkty);
  return punkty;
}

function rozpocznijGre() {
  wyczyscPola();
  $("#wynik").text("Wylosuj kolor");
  $("#proby").text("Pozostały 3 próby");
  $("#zatwierdz").css({ opacity: "60%", cursor: "not-allowed" });
  document.getElementById("zatwierdz").disabled = true;
  $("#losuj").css({ opacity: "100%", cursor: "pointer" });
  document.getElementById("losuj").disabled = false;
}

function wyczyscPola() {
  $("#redValue").val("");
  $("#greenValue").val("");
  $("#blueValue").val("");
}

function zablokujPola() {
  $("#redValue").css({ opacity: "60%", cursor: "not-allowed" });
  document.getElementById("redValue").disabled = true;
  $("#greenValue").css({ opacity: "60%", cursor: "not-allowed" });
  document.getElementById("greenValue").disabled = true;
  $("#blueValue").css({ opacity: "60%", cursor: "not-allowed" });
  document.getElementById("blueValue").disabled = true;
}

function odblokujPola() {
  $("#redValue").css({ opacity: "100%", cursor: "pointer" });
  document.getElementById("redValue").disabled = false;
  $("#greenValue").css({ opacity: "100%", cursor: "pointer" });
  document.getElementById("greenValue").disabled = false;
  $("#blueValue").css({ opacity: "100%", cursor: "pointer" });
  document.getElementById("blueValue").disabled = false;
}

function zablokujWszystkiePola() {
  zablokujPola();
  $("#losuj").css({ opacity: "60%", cursor: "not-allowed" });
  document.getElementById("losuj").disabled = true;
  $("#zatwierdz").css({ opacity: "60%", cursor: "not-allowed" });
  document.getElementById("zatwierdz").disabled = true;
}

$(document).ready(function () {
  rozpocznijGre();
  zablokujPola();

  $("#losuj").click(function () {
    losujKolor();
    odblokujPola();
  });

  $("#zatwierdz").click(function () {
    if (pobierzOdpowiedzi() == true) {
      liczbaProb--;
      $("#proby").text("Pozostały " + liczbaProb + " próby");
      sprawdzOdpowiedz();
    }

    if (liczbaProb === 0) {
      $("#proby").text("Koniec gry");
      $("#wynik").text(
        "Najlepszy wynik: " + Math.max.apply(Math, tablicaWynikow)
      );
      zablokujWszystkiePola();
      console.log(tablicaWynikow);
    }
  });

  $("#nowaGra").click(function () {
    rozpocznijGre();
    zablokujPola();
    liczbaProb = 3;
  });
});
