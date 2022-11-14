var angSlider;
var startingSlider;
var decaySlider;
var stopSlider;

var valDisplay;
var sizeDisplay;

function setup() {
  // default: 800, 600
  createCanvas(1200, 600);
  
  // creating sliders
  angSlider = createSlider(0, PI, PI / 4, .01);
  startingSlider = createSlider(10, 300, 50, 1);
  decaySlider = createSlider(0.1, 0.75, 0.6, .01);
  stopSlider = createSlider(.5, 10, 4, .01);

  // creating text that shows amounts
  valDisplay = createP();
  valDisplay.style('color', '#ff0000');
  valDisplay.style('font-size', 20 + 'px');
  sizeDisplay = createP();
  sizeDisplay.style('color', '#ff0000');
  sizeDisplay.style('font-size', 20 + 'px');
}

function draw() {
  // set-up things
  background(0);
  stroke(255);
  translate(width / 2, height);
  branch(startingSlider.value());

  // displays each value rounded to nearest thousandth
  valDisplay.html('Branch angle is: ' + Math.round((angSlider.value() * (180 / PI)) * 1000) / 1000 + ' degrees');
  sizeDisplay.html('Branch starting size is: ' + startingSlider.value() + ' pixels');
}

function branch(length) {
  // drawing trunk and then translating up via its vertical size
  line(0, 0, 0, -length);
  translate(0, -length);
  
  // if length is greater than threshold, keep going
  if (length > stopSlider.value()) {
    // saving translation state
    push();
    // rotating point (in radians)
    rotate(angSlider.value());
    // recursively calling branch function again, slowly decaying the length
    branch(length * decaySlider.value());
    // resetting back to saved translation state
    pop();
    push()
    rotate(-angSlider.value());
    branch(length * decaySlider.value());
    pop();
  }
}
