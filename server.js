const express = require("express")
const mustacheExpress = require("mustache-express")
const expressValidator = require("express-validator")
const bodyParser = require("body-parser")
// This are outside so any function can accese the data.
const todoList = []
const completedList = []
//
const app = express()

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.get("/", (request, response) => {
  const templateData = {
    todoListForTheBrowser: todoList,
    completedListForTheBrowser: completedList
  }
  response.render("home", templateData)
})

app.post("/addTodo", (request, response) => {
  const descriptionForNewTodo = request.body.description
  todoList.push(descriptionForNewTodo)
  response.redirect("/")
})

app.post("/markComplete", (request, response) => {
  const descriptionOfTheTaskWeAreCompleting = request.body.descriptionOfTheTaskWeAreCompleting
  completedList.push(descriptionOfTheTaskWeAreCompleting)

  const indexOfItem = todoList.indexOf(descriptionOfTheTaskWeAreCompleting)
  todoList.splice(indexOfItem, 1)

  response.redirect("/")
})

app.listen(3000, () => {
  console.log("Funiona")
})
