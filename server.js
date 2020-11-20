const app = require("./src/app")
const port = 8083

app.listen(port, () => {
  console.log(`App está rodando na porta: ${port}`)
})