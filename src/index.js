const fs = require('fs')
const createFeature = require('./tileinfo2polygon').createFeature

const csv = process.argv[2]

if (!csv) {
  console.log('引数に目録CSVを指定してください')
  process.exit(1)
}

const csvData = fs.readFileSync(csv, 'utf8')

const csvLineArray = csvData.split(/\r?\n/g)

const geojson = {
  type: 'FeatureCollection',
  features: []
}

csvLineArray.forEach(line => {
  if (line) {
    geojson.features.push(createFeature(line))
  }
})

const filename = csv.replace('.csv', '.geojson')

fs.writeFileSync(filename, JSON.stringify(geojson))
