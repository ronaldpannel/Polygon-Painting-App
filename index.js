/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const numberOfSidesSlider = document.getElementById("numberOfSidesSlider");
  const numberOfSidesLabel = document.getElementById("numberOfSidesLabel");
  const rotationalOffsetSlider = document.getElementById("angleOffSetSlider");
  const rotationalOffsetLabel = document.getElementById("angleOffSetLabel");
  const radiusSlider = document.getElementById("radiusSlider");
  const radiusSidesLabel = document.getElementById("radiusLabel");
  const insetSlider = document.getElementById("insetSlider");
  const insetSidesLabel = document.getElementById("insetLabel");

  ctx.strokeStyle = "pink";
  ctx.lineWidth = 2;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 5;
  ctx.shadowColor = "black";
  let hue = 0;
  let drawing = false;
  //ctx.globalCompositeOperation = 'difference'

  function drawShape(x, y, radius, inset, n) {
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < n; i++) {
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - radius * inset);
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - radius);
    }
    ctx.restore();
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  let radius = 20;
  let inset = 0.5;
  let n = 5;
  let rotationOffset = 0;
  updateSliderLabels();

  drawShape(50, 600, radius, inset, n);
  let angle = 0;
  canvas.addEventListener("pointermove", function (e) {
    if (drawing) {
      ctx.save();
      ctx.translate(e.offsetX, e.offsetY);
      ctx.rotate(angle);
      hue += 3;
      angle += 0.1;
      drawShape(0 + rotationOffset, 0 + rotationOffset, radius, inset, n);
      ctx.restore();
    }
  });
  canvas.addEventListener("pointerdown", function () {
    drawing = true;
  });

  canvas.addEventListener("pointerup", function () {
    drawing = false;
  });

  numberOfSidesSlider.addEventListener("change", function (e) {
    n = e.target.value;
    updateSliderLabels();
    drawShape(50, 550, radius, inset, n);
  });

  rotationalOffsetSlider.addEventListener("change", function (e) {
    rotationOffset = e.target.value;
    updateSliderLabels();
    drawShape(50, 550, radius, inset, n);
  });
  radiusSlider.addEventListener("change", function (e) {
    radius = e.target.value;
    updateSliderLabels();
    drawShape(50, 550, radius, inset, n);
  });
  insetSlider.addEventListener("change", function (e) {
    inset = e.target.value;
    updateSliderLabels();
    drawShape(50, 550, radius, inset, n);
  });

  function updateSliderLabels() {
    numberOfSidesLabel.innerText = `number of Sides: ${n}`;
    radiusSidesLabel.innerText = `Radius: ${radius}`;
    rotationalOffsetLabel.innerText = `Rotational Offset: ${rotationOffset}`;
    insetSidesLabel.innerText = `Inset Ratio: ${inset}`;
  }

  //load function end
});
