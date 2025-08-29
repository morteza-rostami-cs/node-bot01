import swaggerJsDoc, { type Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

class SwaggerService {
  private static options: Options;
  protected static swaggerSpec: object;

  constructor() {
    SwaggerService.options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'My Bot01',
          version: '1.0.0',
          description: 'API documentation with Swagger + Express + TS',
        },
        servers: [
          {
            url: 'http://localhost:3000/api/v1',
          },
        ],
      },

      // path to files with Swagger annotations
      // './src/routes/*.ts'
      apis: ['./src/index.ts', './src/modules/**/*.ts'],
    };

    SwaggerService.swaggerSpec = swaggerJsDoc(SwaggerService.options);
  }

  public setupSwagger({ app }: { app: Express }): void {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerService.swaggerSpec));
  }
}

// singleton static class
export const swaggerService = new SwaggerService();
