let { Router } = require("express")
Router = new Router()

const getStatusController = require("../controllers/getStatusController")
Router.get("/get-status/:username", getStatusController.get)

module.exports = Router