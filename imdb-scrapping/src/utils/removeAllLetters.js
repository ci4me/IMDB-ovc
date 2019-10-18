
/**
 * @desc Function to remove everyting but numbers from the year string
 * @param {string} year The movie year
 * @returns {string} the year string without words
 * @version 1.0.0
 * @author Gabriel Costa <gabrielcmpaiva@gmail.com>
 */
function removeAllLetters(year) {
  let formattedYear = '';

  year.split('').forEach(character => {
    if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '–'].indexOf(character) !== -1)
      formattedYear += character;
  });

  return formattedYear;
}

module.exports = removeAllLetters;