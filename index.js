const axios = require('axios');

/**
 * Fetch a random joke from the JokeAPI
 * @returns {Promise<string>} - A formatted joke string
 */
async function getRandomJoke() {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const { setup, punchline } = response.data;
    return `${setup}\n${punchline}`;
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    return 'Failed to fetch a joke. Please try again later.';
  }
}

/**
 * Fetch a joke from a specific category
 * @param {string} category - The joke category (e.g., 'general', 'knock-knock', 'programming')
 * @returns {Promise<string>} - A formatted joke string
 */
async function getJokeByCategory(category) {
  try {
    const response = await axios.get(
      `https://official-joke-api.appspot.com/jokes/${category}/random`
    );
    const joke = response.data[0]; // API returns an array
    return `${joke.setup}\n${joke.punchline}`;
  } catch (error) {
    console.error(`Error fetching ${category} joke:`, error.message);
    return `Failed to fetch a ${category} joke. Please try again later.`;
  }
}

/**
 * Fetch multiple random jokes
 * @param {number} count - Number of jokes to fetch (default: 5)
 * @returns {Promise<string[]>} - Array of formatted jokes
 */
async function getMultipleJokes(count = 5) {
  try {
    const response = await axios.get(
      `https://official-joke-api.appspot.com/jokes/random/${count}`
    );
    return response.data.map((joke) => `${joke.setup}\n${joke.punchline}`);
  } catch (error) {
    console.error('Error fetching jokes:', error.message);
    return ['Failed to fetch jokes. Please try again later.'];
  }
}

// Main execution
async function main() {
  console.log('=== Random Joke Generator ===\n');

  // Get a single random joke
  console.log('📝 Random Joke:');
  const randomJoke = await getRandomJoke();
  console.log(randomJoke);

  console.log('\n---\n');

  // Get a programming joke
  console.log('💻 Programming Joke:');
  const programmingJoke = await getJokeByCategory('programming');
  console.log(programmingJoke);

  console.log('\n---\n');

  // Get multiple jokes
  console.log('🎭 Five Random Jokes:');
  const multipleJokes = await getMultipleJokes(5);
  multipleJokes.forEach((joke, index) => {
    console.log(`\n${index + 1}. ${joke}`);
  });
}

// Export functions for use as a module
module.exports = {
  getRandomJoke,
  getJokeByCategory,
  getMultipleJokes,
};

// Run main function if this file is executed directly
if (require.main === module) {
  main();
}
