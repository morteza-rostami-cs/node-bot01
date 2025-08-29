<!--

# this type of import => @import
npm install -D tsconfig-paths
npm install -D tsc-alias

==============

"scripts": {
    "dev": "nodemon --watch src --exec ts-node -r tsconfig-paths/register src/index.ts",
    "build": "tsc && tsc-alias",
    "start": "node dist/index.js",
    "test": "jest"
  },

# create multiple folders
mkdir -p src/{config,modules,shared,infra,bots}

#eslint
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

npx eslint --init

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "lint": "eslint 'src/**/*.{ts,js}' --fix",
  "format": "prettier --write 'src/**/*.{ts,js,json,md}'",
  "build": "tsc",
  "start": "node dist/index.js"
}

"dev": "ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/index.ts"

# create multiple files
 touch ./src/modules/user/{controller.ts,service.ts,repository.ts,schema.ts}

 -->
