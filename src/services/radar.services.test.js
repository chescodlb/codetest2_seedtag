const RadarService = require('./radar.service');
const radarService = new RadarService();

const failInvalidData = {
    protocols: ['furthest-enemies'],
}

const failWithOutProtocols = {
    scan: [{coordinates:{x:11,y:58}},{coordinates:{x:91,y:39}}],
}

const protocolEmpty= {
    protocols: [],
    scan: [{coordinates:{x:11,y:58}},{coordinates:{x:91,y:39}}],
}

const protocolfurthest = {
    protocols: ['furthest-enemies'],
    scan: [{coordinates:{x:11,y:58}},{coordinates:{x:91,y:39}}],
}

const protocolclosest = {
    protocols: ['closest-enemies'],
    scan: [{coordinates:{x:11,y:58}},{coordinates:{x:91,y:39}}],
}

const protocolAssistAllies = {
    protocols: ['assist-allies', ],
    scan: [{
        enemies: {number:10,type:'soldier'},
        allies:3,
        coordinates:{ x:5,y:35 },
    },{
        enemies:{number:20,type:'soldier'},
        coordinates:{y:35,x:5},
    }]
}

const protocolAvoidCrossfire = {
    protocols: ['avoid-crossfire'],
    scan: [{
        enemies: {number:10, type:'soldier'},
        allies:3,
        coordinates:{x:5,y:35}
        },{
            enemies:{number:20,type:'soldier'},
            coordinates:{x:35,y:5}
        }]
}

const protocolPrioritizeMech = {
    protocols:['prioritize-mech'],
    scan:[
        {coordinates:{x:0,y:40},enemies:{type:'soldier',number:10}},
        {coordinates:{x:0,y:80},allies:5,enemies:{type:'mech',number:1}}]
}

const protocolAvoidMech = {
    protocols:['avoid-mech'],
    scan:[
        {coordinates:{x:0,y:40},enemies:{type:'soldier',number:10}},
        {coordinates:{x:0,y:80},allies:5,enemies:{type:'mech',number:1}}]
}

const protocolMix = {
    protocols:['closest-enemies','avoid-mech'],
    scan:[
        {coordinates:{x:0,y:1},enemies:{type:'mech',number:1}},
        {coordinates:{x:0,y:10},enemies:{type:'soldier',number:10}},
        {coordinates:{x:0,y:99},enemies:{type:'mech',number:1}}]}


describe('NextTarget', () => {
    test('Fail went send empty data', () => {
        try {
            radarService.nextTarget({})
        } catch (e) {
            expect(e.message).toEqual('Invalid data');
        }
    })

    test('Fail went scan is empty', () => {
        try {
            radarService.nextTarget(failInvalidData)
        } catch (e) {
            expect(e.message).toEqual('Invalid data');
        }
    })

    test('Fail went protocol is empty', () => {
        try {
            radarService.nextTarget(failWithOutProtocols)
        } catch (e) {
            expect(e.message).toEqual('Invalid data');
        }
    })

    test('Fail went send empty data', () => {
        try {
            radarService.nextTarget(failWithOutProtocols)
        } catch (e) {
            expect(e.message).toEqual('Invalid data');
        }
    })

    test('Protocol closest', () => {
        const data  = radarService.nextTarget(protocolclosest);
        expect(data).toBeDefined()
        expect(data.x).toEqual(11)
        expect(data.y).toEqual(58)
    })

    test('Protocol furthest', () => {
        const data  = radarService.nextTarget(protocolfurthest);
        expect(data).toBeDefined()
        expect(data.x).toEqual(91)
        expect(data.y).toEqual(39)
    })

    test('Protocol assist allies', () => {
        const data  = radarService.nextTarget(protocolAssistAllies);
        expect(data).toBeDefined()
        expect(data.x).toEqual(5)
        expect(data.y).toEqual(35)
    })

    test('Protocol avoid crossfire', () => {
        const data  = radarService.nextTarget(protocolAvoidCrossfire);
        expect(data).toBeDefined()
        expect(data.x).toEqual(35)
        expect(data.y).toEqual(5)
    })

    test('Protocol Prioritize Mech', () => {
        const data  = radarService.nextTarget(protocolPrioritizeMech);
        expect(data).toBeDefined()
        expect(data.x).toEqual(0)
        expect(data.y).toEqual(80)
    })

    test('Protocol avoid-mech', () => {
        const data  = radarService.nextTarget(protocolAvoidMech);
        expect(data).toBeDefined()
        expect(data.x).toEqual(0)
        expect(data.y).toEqual(40)
    })

    test('Protocol mix closest and avoidMech', () => {
        const data  = radarService.nextTarget(protocolMix);
        expect(data).toBeDefined()
        expect(data.x).toEqual(0)
        expect(data.y).toEqual(10)
    })
})