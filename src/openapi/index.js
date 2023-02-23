const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const pathFile = path.resolve(__dirname, 'paths.yml');
const schemasFile = path.resolve(__dirname, 'schemas.yml');
const examplesFile = path.resolve(__dirname, 'examples.yml');
// const securitySchemesFile = path.resolve(__dirname, 'securitySchemes.yml');
const paths = yaml.load(fs.readFileSync(pathFile, 'utf8'));
const schemas = yaml.load(fs.readFileSync(schemasFile, 'utf8'));
const examples = yaml.load(fs.readFileSync(examplesFile, 'utf8'));
// const securitySchemes = yaml.load(fs.readFileSync(securitySchemesFile, 'utf8'));

module.exports = {
  openapi: '3.0.3',
  info: {
    version: '0.0.1',
    title: 'ELEINK',
    description: 'RESTFull API for ELEINK page',
    termsOfService: 'http://swagger.io/terms/',
  },
  servers: [{ url: 'http://localhost:3000/' }],
  paths,
  components: {
    schemas,
    examples,
    // securitySchemes,
  },
};
