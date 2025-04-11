const backstories = [
  "Growing up on the fringes of society, you never expected to become a wizard ...",
  "You were always fascinated by the mysteries of the arcane ...",
  "A humble apprentice in an apothecary, you were unexpectedly discovered by ...",
  "After discovering an ancient artifact, you were drawn ...",
  "Fresh out of Frostgrave University, your degree in magic was ...",
];

function getRandomBackstory() {
  return backstories[Math.floor(Math.random() * backstories.length)];
}

module.exports = getRandomBackstory;
