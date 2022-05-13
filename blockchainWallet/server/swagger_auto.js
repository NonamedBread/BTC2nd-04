const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
      title: "",
      description: "",
    },
    host: "",
    schemes: ["http"],
  };
  
  const outputFile = "./swagger-output.json";
  const endpointsFiles = [
    "./main.js"
  ];
  
swaggerAutogen(outputFile, endpointsFiles, doc);