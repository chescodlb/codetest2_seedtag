const routes = require('express').Router()
const RadarService = require('../services/radar.service')
const radarService = new RadarService()

routes.post('/radar', async (req, res) => {
    try {
        const nextTarget = radarService.nextTarget(req.body)
        res.status(200).send(nextTarget)
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: e.message})
    }
})

module.exports = routes;