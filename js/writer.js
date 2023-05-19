const app = document.getElementById('type-writer')
const type_writer = new Typewriter(app, {
    loop: true,
    delay: 75
})
const string = app.innerHTML

type_writer
    .typeString("RESULTADOS GRANDES")
    .pauseFor(5000)
    .start()