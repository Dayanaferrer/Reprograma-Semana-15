const app = require("./src/app")
const PORT = process.env.PORT

app.listen(port, () => {
  console.log(`App está rodando na porta: ${PORT}`)
})