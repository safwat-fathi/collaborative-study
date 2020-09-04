export default function erasing(context, x, y, room, client, send) {
  context.clearRect(x, y, 20, 20);

  // changing cursor style to eraser
  // canvas.current.style.cursor = `url(${eraserImg}) 1 10, auto`;

  try {
    if (!send) {
      return;
    }

    // if (undo) {
    //   context.clearRect(0, 0, canvas.current.width, canvas.current.height);
    // }

    client.send(
      JSON.stringify({
        type: "erasing",
        room,
        payload: {
          x,
          y,
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}
