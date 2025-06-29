document.addEventListener("DOMContentLoaded", function () {
  // Digital Clock
  const clock = document.getElementById("digital-clock");
  if (clock) {
    setInterval(() => {
      clock.textContent = new Date().toLocaleTimeString();
    }, 1000);
  }

  // Cookie Greeting
  const greet = document.createElement('div');
  greet.id = 'welcome-banner';
  document.body.prepend(greet);

  const lastVisit = document.cookie.split('; ').find(row => row.startsWith('lastVisit='));
  let message = "Welcome to my portfolio!";

  if (lastVisit) {
    const lastDate = new Date(decodeURIComponent(lastVisit.split('=')[1]));
    message = `Welcome back! Last visit: ${lastDate.toLocaleString()}`;
  }

  greet.textContent = message;
  greet.style.display = 'block';
  greet.style.backgroundColor = '#ffc107';
  greet.style.color = '#000';
  greet.style.padding = '10px';
  greet.style.fontWeight = 'bold';
  greet.style.textAlign = 'center';
  document.cookie = `lastVisit=${encodeURIComponent(new Date().toISOString())}; path=/; max-age=31536000`;

  setTimeout(() => greet.style.display = 'none', 8000);

  // Joke API
  async function fetchJoke() {
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Programming,Pun?type=single');
      const data = await res.json();
      document.getElementById("joke-text").textContent = data.joke;
    } catch (err) {
      document.getElementById("joke-text").textContent = "Couldn't fetch a joke right now.";
    }
  }

  fetchJoke();
  setInterval(fetchJoke, 60000);

  // XKCD Comic
  async function fetchComic() {
    const comicBox = document.getElementById("comic-container");
    const randomId = Math.floor(Math.random() * 2500) + 1;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://xkcd.com/${randomId}/info.0.json`)}`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      const data = JSON.parse(json.contents);
      comicBox.innerHTML = `<strong>${data.title}</strong><br><img src="${data.img}" alt="${data.alt}" title="${data.alt}" style="max-width:100%; height:auto;" />`;
    } catch (e) {
      comicBox.innerHTML = `<p>Unable to fetch XKCD comic.</p>`;
    }
  }

  fetchComic();

  // Visitor Counter
  const counterContainer = document.createElement('div');
  counterContainer.id = 'visitor-counter';
  counterContainer.style.textAlign = 'center';
  counterContainer.style.color = '#aaa';
  counterContainer.style.fontSize = '0.9rem';
  counterContainer.style.padding = '10px';
  document.body.appendChild(counterContainer);

  let visits = localStorage.getItem('visitCount') || 0;
  visits++;
  localStorage.setItem('visitCount', visits);
  counterContainer.textContent = `You have visited this page ${visits} time(s).`;
});
// Analog Clock
const canvas = document.getElementById("analog-clock");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;
  ctx.translate(radius, radius);

  function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }

  function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
      const ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    second = second * Math.PI / 30;
    drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
  }

  function drawHand(ctx, pos, length, width, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  setInterval(drawClock, 1000);
}
// Show/Hide Email
const toggleBtn = document.getElementById("toggle-email");
const emailSpan = document.getElementById("email-address");
if (toggleBtn && emailSpan) {
  toggleBtn.addEventListener("click", () => {
    const isVisible = emailSpan.style.display === "inline";
    emailSpan.style.display = isVisible ? "none" : "inline";
    toggleBtn.textContent = isVisible ? "Show Email" : "Hide Email";
  });
}
