# nexplorer

## Get Started

```bash
# install dependencies
yarn
```

### Generate API Documentation

```bash
yarn workspace api doc
```

Documentation HTML will be generated in `packages/api/doc` folder.

### Generate API Swagger JSON

create a `.env` file in `packages/api` folder with the following content:

```bash
NODE_ENV=development

MONGO_PROTOCOL=mongodb
MONGO_USER=
MONGO_PASSWORD=
MONGO_HOST=localhost:27017
MONGO_DB_NAME=todo
```

Then run command:

```bash
yarn workspace api doc:swagger
```

A `swagger.json` file will be generated in `packages/api/doc` folder.
