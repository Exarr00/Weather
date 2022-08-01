const forecast = document.querySelector('.forecast');

let isDown = false;
let startPos;
let leftScroll;

function start(e) {
  isDown = true;
  forecast.classList.add('active');
  startPos = e.pageX - forecast.offsetLeft;
  leftScroll = forecast.scrollLeft;
}

function end() {
  isDown = false;
  forecast.classList.remove('active');
}

function move(e) {
  if (!isDown) return;
  e.preventDefault();
  const getX = e.pageX - forecast.offsetLeft;
  const moveX = (getX - startPos) * 2;
  forecast.scrollLeft = leftScroll - moveX;
}

export { start, end, move };

//active 
//change pointer
//
