import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import { Request, Response ,Express as ExpressType} from 'express'
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Book My Show API',
          description: "API endpoints for a book my show services documented on swagger",
          version: '1.0.0',
        },
        servers: [
          {
            url: "http://localhost:3000/",
            description: "Local server"
          },
          {
            url: "http://localhost:3000/",
            description: "Live server"
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
      // looks for configuration in specified directories
      apis: ['./src/application/routes/*.ts'],
    }
    const swaggerSpec = swaggerJsdoc(options)
    const swaggerDocs = (app:ExpressType) => {
      // Swagger Page
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
      // Documentation in JSON format
      app.get('/docs.json', (req:Request, res:Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
      })
    }
    export default swaggerDocs