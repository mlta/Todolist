const express = require("express")
const mustacheExpress = require("mustache-express")
const expressValidator = require("express-validator")
const bodyParser = require("body-parser")
// This are outside so any function can accese the data.
const todoList = []
const completedList = []
//const expressSession = require("express-session")
const app = express()

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

// app.use(
//   expressSession({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true
//   })
// )

// Create the home for my form
app.get("/", (request, response) => {
  const templateData = {
    todoListForTheBrowser: todoList,
    completedListForTheBrowser: completedList
  }
  response.render("home", templateData)
})
// when I'm creating the todo's
// i'm using post because I'm giving information to the server, because I have created data.

app.post("/addTodo", (request, response) => {
  const descriptionForNewTodo = request.body.description
  todoList.push(descriptionForNewTodo)
  response.redirect("/")
})

// When I have mark Complete goes to the complete section
app.post("/markComplete", (request, response) => {
  const descriptionOfTheTaskWeAreCompleting = request.body.descriptionOfTheTaskWeAreCompleting
  completedList.push(descriptionOfTheTaskWeAreCompleting)

  const indexOfItem = todoList.indexOf(descriptionOfTheTaskWeAreCompleting)
  todoList.splice(indexOfItem, 1)
  //
  // // Session
  // const todoList = request.session.todoList || []
  //
  // const id = parseInt(request.body.id)
  //
  // const todo = todoList.find(todo => todo.id === id)
  //
  // if (todo) {
  //   todo.completed = true
  //
  //   // Place the todolist back in the session
  //   request.session.todoList = todoList
  // }

  response.redirect("/")
})

app.listen(3000, () => {
  console.log("Funciona")
})
