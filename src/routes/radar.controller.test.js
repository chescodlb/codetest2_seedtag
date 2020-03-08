const request = require('supertest')

let app

const protocolfurthest = {
    protocols: ['furthest-enemies'],
    scan: [{coordinates:{x:11,y:58}},{coordinates:{x:91,y:39}}],
}

const failInvalidData = {
    protocols: ['furthest-enemies'],
    scan: [],
}

const failWithOutProtocols = {
    scan: [{coordinates:{x:11,y:58}},{coordinates:{x:91,y:39}}],
}
const mixProtocols = {
    protocols:['furthest-enemies','avoid-mech', 'avoid-crossfire'],
    scan:[{coordinates:{x:89,y:13},enemies:{type:'mech',number:1}},
        {coordinates:{x:11,y:35},allies:4,enemies:{type:'soldier',number:10}},
        {coordinates:{x:19,y:49},enemies:{type:'soldier',number:10}}]
}

describe('POST /radar ', () => {
    beforeAll(async (done) => {
        app = require('../../index')
        done()
    })

    test('Success protocol Fusthest', async (done) => {
      const response = await request(app)
        .post('/radar')
        .send(protocolfurthest)
      expect(response.status).toEqual(200)
      expect(response.body.x).toEqual(91)
      expect(response.body.y).toEqual(39)
      done()
    })

    test('Success mix protocols', async (done) => {
        const response = await request(app)
          .post('/radar')
          .send(mixProtocols)
        expect(response.status).toEqual(200)
        expect(response.body.x).toEqual(19)
        expect(response.body.y).toEqual(49)
        done()
    })

    test('fail invalid data', async (done) => {
        const response = await request(app)
          .post('/radar')
          .send({})
        expect(response.status).toEqual(500)
        expect(response.body.message).toEqual('Invalid data');
        done()
    })

    test('fail without protocols', async (done) => {
        const response = await request(app)
          .post('/radar')
          .send(failInvalidData)
        expect(response.status).toEqual(500)
        expect(response.body.message).toEqual('Invalid data');
        done()
    })

    test('fail without protocols', async (done) => {
        const response = await request(app)
          .post('/radar')
          .send(failWithOutProtocols)
        expect(response.status).toEqual(500)
        expect(response.body.message).toEqual('Invalid data');
        done()
    })
})