export default function drawLine(context, x0, y0, x1, y1, socket, emit) {
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.lineWidth = 2;
  context.stroke();
  context.closePath();

  if (!emit) {
    return;
  }
  // var w = canvas.width;
  // var h = canvas.height;

  socket.emit("drawing", {
    x0: x0,
    y0: y0,
    x1: x1,
    y1: y1,
    // color: color,
  });
}
