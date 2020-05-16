export default function drawLine(
  context,
  x0,
  y0,
  x1,
  y1,
  color,
  room,
  client,
  send
) {
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.lineWidth = 2;
  context.strokeStyle = color;
  context.stroke();
  context.closePath();

  if (!send) {
    return;
  }

  client.send(
    JSON.stringify({
      type: "drawing",
      room,
      message: {
        x0,
        y0,
        x1,
        y1,
        color,
      },
    })
  );
}
