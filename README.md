# SBA318 and SBA319

This is the start of an express server that will be used in my capstone project. It is a data server for a miniature wargame called [Frostgrave 2nd Edition](https://boardgamegeek.com/boardgame/317519/frostgrave-second-edition). Players put together a small band of hapless mercenaries, lead by a wizard and his/her unlucky apprentice as they explore the ruins of an ancient frozen city.

## Description

There are currently 3 categories of data each with multiple sub tables. Reference data is read only data and give reference rules for the game an cannot be modified. There is also a user database that has only get methds for now. Lastly there is the warband database that contains wizard, apprentice and follower data that can be created, modified, and deleted.

I've also create a view to see a POST request in order to make a new wizard. More endpoints will be documented inside. For now the data is stored in JSON files, POST methods will write to JSON.

## Getting Started

### Dependencies

- Express v5.1.0
- nodemon v3.1.9
- EJS v3.1.10

### Installing

```
$ npm init
$ npm install express
$ npm install nodemon
$ npm install ejs
```

### Executing program

- I've set up a script in the package.json to be able to run nodemon

```
$ npm run dev
```

-This will run on [localhost:3000](http://localhost:3000/)

## Authors

Contributors names and contact info

Gregory Jung - [Portfolio](https://tenor2000.github.io/react-portfolio/)

## Version History

- v0.1 basic endpoints are working for:
  - api/reference
  - api/warbands/wizards
  - api/warbands/apprentices
  - api/warbands/personnel
  - api/users

## Acknowledgments

Inspiration, code snippets, etc.

- [awesome-readme](https://github.com/matiassingers/awesome-readme)
- [Joseph McCullough](https://www.josephamccullough.com/)

## Rubric Checklist

Create and use at least two pieces of custom middleware.

- SBA318/index.js

Create and use error-handling middleware.

- SBA318/index.js

Use at least three different data categories (e.g., users, posts, or comments).

- SBA318/src/testData/referenceData
- SBA318/src/testData/userData
- SBA318/src/testData/warbandData

Utilize reasonable data structuring practices.

- SBA318/src/testData

Create GET routes for all data that should be exposed to the client.

- SBA318/index.js
- SBA318/src/routes/reference.js
- SBA318/src/routes/warbands.js
- SBA318/src/routes/users.js

Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request.

- SBA318/src/routes/warbands.js

Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request.

- SBA318/src/routes/warbands.js

allow for client deletion via a DELETE request.

- SBA318/src/routes/warbands.js

Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters.

- SBA318/src/routes/reference.js
- SBA318/src/routes/warbands.js

Utilize route parameters, where appropriate.

- SBA318/src/routes/reference.js
- SBA318/src/routes/warbands.js

Use simple CSS to style the rendered views.

- SBA318/src/styles/styles.css

Include a form within a rendered view that allows for interaction with your RESTful API.

- SBA318/src/views/create.ejs

Utilize reasonable code organization practices.

- SBA318

Ensure that the program runs without errors

- SBA318

Commit frequently to the git repository.

- Yes

Include a README file that contains a description of your application.

- Yes

Level of effort displayed in creativity, presentation, and user experience.

- Yes
