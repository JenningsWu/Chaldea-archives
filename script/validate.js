"use strict"

const fs = require('fs-extra')
const glob = require('glob')
const Ajv = require('ajv')

const ajv = new Ajv()
const validate = ajv.compile(JSON.parse(fs.readFileSync('./servant_schema.json')))

const files = glob.sync('../js/assets/data/servants/*.json')

for (const f of files) {
  const valid = validate(JSON.parse(fs.readFileSync(f)))
  if (!valid) console.log(f, validate.errors)
}
