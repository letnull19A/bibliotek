import swaggerAutogen from 'swagger-autogen'

const doc = {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: 'My API',
      description: 'Description'
    },
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    host: 'localhost:3000'
  };
  
  const outputFile = './swagger/output.json';
  const routes = ['./routes/index.js'];
  
  swaggerAutogen()(outputFile, routes, doc)