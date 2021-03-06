# STRAPI STARTER PROJECT

#### 1. Clone the `strapi-starter` repository with this command: 
``` bash
git clone https://gitlab.com/juulchin/juulchin-front.git
```
#### 2. Install dependencies with this command: 
``` bash
npm install
```
#### 3. Run the application with this command: 
``` bash
npm run dev
```

### IN STRAPI V4, YOU NEED TO COPY THESE IN ORDER TO USE DYNAMIC ZONE AS A PAGE LAYOUT
``` bash
strapi-project/src/helpers/populate.js
```

const { createCoreController } = require("@strapi/strapi/lib/factories");

function populateAttribute({ components }) {
  if (components) {
    const populate = components.reduce((currentValue, current) => {
      return { ...currentValue, [current.split(".").pop()]: { populate: "*" } };
    }, {});
    return { populate };
  }
  return { populate: "*" };
}

const getPopulateFromSchema = function (schema) {
  return Object.keys(schema.attributes).reduce((currentValue, current) => {
    const attribute = schema.attributes[current];
    if (!["dynamiczone", "component"].includes(attribute.type)) {
      return currentValue;
    }
    return {
      ...currentValue,
      [current]: populateAttribute(attribute),
    };
  }, {});
};

function createPopulatedController(uid, schema) {
  return createCoreController(uid, () => {
    console.log(schema.collectionName, getPopulateFromSchema(schema));
    return {
      async find(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.find(ctx);
      },
      async findOne(ctx) {
        ctx.query = {
          ...ctx.query,
          populate: getPopulateFromSchema(schema),
        };
        return await super.findOne(ctx);
      },
    };
  });
}

module.exports = createPopulatedController;


``` bash
/api/YOUR_COLLECTION/controllers/YOUR_COLLECTION.js
```

"use strict";

/**
 *  homepage controller
 */
const collectionType = 'home'

const schema = require(`../content-types/${collectionType}/schema.json`);
const createPopulatedController = require('../../../helpers/populate');

module.exports = createPopulatedController(`api::${collectionType}.${collectionType}`, schema);