import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
import * as fs from 'fs';

export async function initializeSwagger(app: INestApplication) {
    const server = app.getHttpAdapter();
    const serviceName = 'Bug report';
    const serviceDescription = '@ApiParam unexpected behaviour';
    const apiVersion = '0.0.1';
    const docsBaseUrl = '/docs/bug'

    const options = new DocumentBuilder()
        .setTitle(`${serviceName} API spec`)
        .setDescription(
            `${serviceDescription} | [swagger.json](swagger.json) | [swagger-2.0.json](swagger-2.0.json)`,
        )
        .setVersion(apiVersion)
        .addServer(`http://127.0.0.1:3111`)
        .build();

    const oas3 = await generateSwaggerSpecs(app, options);
    writeSwaggerJson(`${process.cwd()}`, oas3);

    server.get(`${docsBaseUrl}/swagger.json`, (req, res) => {
        res.json(oas3);
    });

    SwaggerModule.setup(docsBaseUrl, app, oas3, {
        swaggerOptions: {
            displayOperationId: true,
        },
    });
}

async function generateSwaggerSpecs(
    app: INestApplication,
    config: Omit<OpenAPIObject, 'paths'>,
): Promise<OpenAPIObject> {
    const oas3: OpenAPIObject = SwaggerModule.createDocument(app, config);
    return oas3;
}

function writeSwaggerJson(path: string, oas3: OpenAPIObject) {
    const swaggerFile = `${path}/swagger.json`;
    fs.writeFileSync(swaggerFile, JSON.stringify(oas3, null, 2), {
        encoding: 'utf8',
    });
}

