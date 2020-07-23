export default function draw(
  context,
  x0,
  y0,
  x1,
  y1,
  color,
  room,
  client,
  send,
  canvas,
  undo
) {
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.lineWidth = 2;
  context.strokeStyle = color;
  context.stroke();
  context.closePath();

  try {
    if (!send) {
      return;
    }

    // if (undo) {
    //   context.clearRect(0, 0, canvas.current.width, canvas.current.height);
    // }

    client.send(
      JSON.stringify({
        type: "drawing",
        room,
        payload: {
          x0,
          y0,
          x1,
          y1,
          color,
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}
