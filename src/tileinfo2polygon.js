const sphericalmercator = require('@mapbox/sphericalmercator')
const merc = new sphericalmercator()
const moment = require('moment-timezone')

const parsePath = str => {
  const path = str.split(',')[0].split('/')
  const z = parseInt(path[0])
  const x = parseInt(path[1])
  const y = parseInt(path[2].replace(/\.png/, ''))
  return { x: x, y: y, z: z }
}

const unixtime2JST = str => {
  const unixtime = parseInt(str.split(',')[1] + '000')
  const date = moment(unixtime).tz('Asia/Tokyo')
  return date.format()
}

const floor = coord => {
  const digit = Math.pow(10, 6)
  return Math.floor(coord * digit) / digit
}
const polygonize = tileCoord => {
  const wsen = merc.bbox(tileCoord.x, tileCoord.y, tileCoord.z)
  const polygonCoord = [
    [
      [floor(wsen[0]), floor(wsen[3])],
      [floor(wsen[2]), floor(wsen[3])],
      [floor(wsen[2]), floor(wsen[1])],
      [floor(wsen[0]), floor(wsen[1])],
      [floor(wsen[0]), floor(wsen[3])]
    ]
  ]

  return polygonCoord
}

const createFeature = str => {
  const feature = {
    type: 'Feature',
    properties: {
      date: unixtime2JST(str),
      unixtime: str.split(',')[1],
      tilePath: str.split(',')[0]
    },
    geometry: {
      type: 'Polygon',
      coordinates: polygonize(parsePath(str))
    }
  }
  return feature
}

module.exports = {
  parsePath: parsePath,
  unixtime2JST: unixtime2JST,
  createFeature: createFeature
}
