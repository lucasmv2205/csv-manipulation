# csv-manipulation
The results files are created in src/files/results, after run the application.

##
The answer for each question is a function called "calculateSupportOpposeCounts" in each repository (LegislatorRepository for 1 and BillRepository for 2)
The fucntions to create the csv files are in index.ts in 2 different functions, createLegislatorsSupportOpposeCountCsv and createBillsSupportOpposeCountCsv

#### Tech

- node
- typescript
- csv-parser
- jest

#### Requirements to run this app

- node.js 18.x and npm
- Docker

Before try to run the application, first install the dependencies.
You need to have node.js and npm installed on your machine. If not, take a look here: <https://nodejs.org/en>

#### Install dependencies
First off all, install the dependencies packages

```bash
npm install
```

## With node.js

#### Run app

```bash
npm run dev
```

#### Run test

```bash
npm run test
```

## With docker

#### run app and the tests

```bash
docker-compose up
```

#### run app

```bash
docker-compose run app
```

#### run tests

```bash
docker-compose run test
```
