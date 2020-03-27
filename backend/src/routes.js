const express = require('express')

const Ong = require('./controller/OngController')
const Incident = require('./controller/IncidentController')
const Profile = require('./controller/ProfileController')
const Session = require('./controller/SessionController')

const routes = express.Router()

routes.post("/sessions", Session.create )

routes.get("/ongs", Ong.index )
routes.post("/ongs", Ong.create )

routes.get("/profile", Profile.index )

routes.get("/incidents", Incident.index )
routes.post("/incidents", Incident.create )
routes.delete("/incidents/:id", Incident.delete )

module.exports = routes