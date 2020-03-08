const PROTOCOLS = require('../constants/protocols')

  /**
   * distanceObjective Distance between origin and the point
   * @param {Object} Point {X,Y} 
   * @returns Number Distance between origin and the point
   */
  function distanceObjective(point) {
    return Math.pow(point.x, 2) + Math.pow(point.y, 2)
  }

  /**
   * scanWithDistances add a propertie distances to all the objects on de array
   * @param [Array] List of objects posibleObjectives 
   * @returns [Array] List of objects posibleObjectives with a new propertie distance
   */
  function scanWithDistances(scan) {
    return scan.map(function(element) {
     element.distance = distanceObjective(element.coordinates);
     return element;
     });
 }
  
  /**
   * avoidMechList Return the list of objective without enemies type mech
   * @param [Array] 
   * @returns [Array] 
   */
  function avoidMechList(scan) {
    return scan.filter(function(element) {
        if(element.enemies.type !== "mech"){
            return element
        }
      })
    }

  /**
   * prioritizeMechList Return the list of objective that have enemies type mech
   * @param [Array] 
   * @returns [Array] 
   */
  function prioritizeMechList(scan) {
    return scan.filter(function(element) {
      if(element.enemies.type === "mech"){
        return element
      }
    })
  }

/**
   * avoidCrossfire Return the list of objective without enemies type mech
   * @param [Array] 
   * @returns [Array] 
   */
  function avoidCrossfire(scan) {
    return scan.filter(function(element) {
    if(!element.allies){
        return element
    }
  })
}

/**
 * assistAllies Return the list of objective that have enemies type mech
 * @param [Array] 
 * @returns [Array] 
 */
function assistAllies(scan) {
    return scan.filter(function(element) {
    if(element.allies){
        return element
    }
  })
}

  /**
   * closestObjective Return the objective closest
   * @param [Array] 
   * @returns {Object} {"enemies":{"type":"soldier","number":15},"allies":4,"coordinates":{"y":83,"x":19}}
   */
function closestObjective(scan) {
    const objectivesWithDistances = scanWithDistances(scan)
    const minDistance = objectivesWithDistances[0];

    const closest = objectivesWithDistances.reduce(function(minDistance, e){
        if(minDistance.distance > e.distance) {
            minDistance = e
        }
        return minDistance
    })

    return closest;
}

  /**
   * furthestObjective Return the objective furthest
   * @param [Array] 
   * @returns {Object}
   */
function furthestObjective(scan) {
    const objectivesWithDistances = scanWithDistances(scan)
    const maxDistance = objectivesWithDistances[0];

    const furthest = objectivesWithDistances.reduce(function(maxDistance, e){
        if(maxDistance.distance < e.distance) {
            maxDistance = e
        }
        return maxDistance
    })

    return furthest;
}

class radarService {
    constructor(){}

    nextTarget(params){
        if(!params){
            throw new Error('Invalid data');
        }
        const { protocols, scan } = params
        if(!protocols || !scan || scan.length === 0){
            throw new Error('Invalid data');
        }


        let posibleObjectives = [...scan]
        let target = {};
        
        if(protocols.includes(PROTOCOLS.AVOIDMECH)) {
            posibleObjectives = avoidMechList(posibleObjectives)
        }

        if(protocols.includes(PROTOCOLS.PRIORITIZE_MECH)) {
            posibleObjectives = prioritizeMechList(posibleObjectives)
        }

        if(protocols.includes(PROTOCOLS.AVOID_CROSSFIRE)) {
            posibleObjectives = avoidCrossfire(posibleObjectives)
        }

        if(protocols.includes(PROTOCOLS.ASSIST_ALLIES)) {
            posibleObjectives = assistAllies(posibleObjectives)
        }

        if (posibleObjectives.length === 1) {
            return {
                x: posibleObjectives[0].coordinates.x, 
                y: posibleObjectives[0].coordinates.y 
            };
        }

        //Get de distance of every posibleObjective
        posibleObjectives = scanWithDistances(posibleObjectives)

        if(protocols.includes(PROTOCOLS.FURTHEST)) {
            target = furthestObjective(posibleObjectives).coordinates
        } else {
            target = closestObjective(posibleObjectives).coordinates
        }
        
        return {
            x: target.x, 
            y: target.y 
        };
    }
}

module.exports = radarService

