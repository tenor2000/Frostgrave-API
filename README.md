# SBA318

This is the start of an express server that will be used in my capstone project. It is a data server for a miniature wargame called [Frostgrave 2nd Edition](https://boardgamegeek.com/boardgame/317519/frostgrave-second-edition). Players put together a small band of hapless mercenaries, lead by a wizard and his/her unlucky apprentice as they explore the ruins of an ancient frozen city.

## Description

There are currently 3 categories of data each with multiple sub tables. Reference data is read only data and give reference rules for the game an cannot be modified. There is also a user database that has only get methds for now. Lastly there is the warband database that contains wizard, apprentice and personnel data that can be modified and deleted.

I've also create a view to see a POST request in order to make a new wizard. More endpoints will be documented inside.

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
