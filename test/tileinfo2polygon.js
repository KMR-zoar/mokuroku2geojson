const assert = require('assert')
const tileInfo2Polygon = require('../src/tileinfo2polygon')

describe('タイル目録から GeoJSON を生成する', () => {
  const str =
    '17/110294/56351.png,1536561419,1580,23a5d2177f9bd81639a5050643b66391'
  it('パスをタイル座標に分割する', () => {
    const ideal = JSON.stringify({ x: 110294, y: 56351, z: 17 })
    assert.equal(JSON.stringify(tileInfo2Polygon.parsePath(str)), ideal)
  })
  it('unixtimeをローカル時刻に変換する', () => {
    const ideal = '2018-09-10T15:36:59+09:00'
    assert.equal(tileInfo2Polygon.unixtime2JST(str), ideal)
  })
})
