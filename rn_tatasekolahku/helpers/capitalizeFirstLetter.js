export default function capitalizeFirstLetter(str) {
  // type validation
  if (!str || typeof str !== 'string') {
    throw new Error(
      'Not String: invalid parameter passed in capitalizeFirstLetter function',
    );
  }
  let result = '';
  const arrayOfStr = str.split(' ');
  arrayOfStr.forEach(word => {
    result = word[0].toUpperCase() + word.substring(1).toLowerCase();
  });

  return result;
}
