const { getRandomJoke, getJokeByCategory, getMultipleJokes } = require('./index');

async function runTests() {
  console.log('🧪 Running Tests...\n');

  try {
    console.log('Test 1: Get Random Joke');
    const randomJoke = await getRandomJoke();
    console.log('✅ Passed\n');

    console.log('Test 2: Get Programming Joke');
    const progJoke = await getJokeByCategory('programming');
    console.log('✅ Passed\n');

    console.log('Test 3: Get Knock-Knock Joke');
    const knockJoke = await getJokeByCategory('knock-knock');
    console.log('✅ Passed\n');

    console.log('Test 4: Get Dad Joke (Groaner!)');
    const dadJoke = await getJokeByCategory('general');
    console.log('✅ Passed\n');

    console.log('Test 5: Get Multiple Jokes');
    const jokes = await getMultipleJokes(3);
    console.log(`✅ Passed (got ${jokes.length} jokes)\n`);

    console.log('🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

runTests();
