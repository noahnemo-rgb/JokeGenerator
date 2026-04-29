# 🎭 Random Joke Generator

A simple Node.js application that fetches random jokes from the **[Official Joke API](https://official-joke-api.appspot.com/)**.

## How Jokes Are Generated

This application uses a **REST API-based approach** to generate and retrieve jokes:

### 1. **External API Integration**
- The generator connects to the **Official Joke API** (`https://official-joke-api.appspot.com/`), a free, public API that hosts a curated database of jokes.
- All jokes are pre-stored and categorized on the API server, ensuring consistent, high-quality humor.

### 2. **Fetching Mechanism**
The application supports three different joke retrieval methods:

#### **Random Joke Selection**
- **Endpoint:** `/random_joke`
- **Process:** The API randomly selects a joke from its entire database and returns it
- **Response:** Contains `setup`, `punchline`, `type`, and `id` fields

#### **Category-Based Fetching**
- **Endpoint:** `/jokes/{category}/random`
- **Process:** The API filters jokes by category (e.g., 'programming', 'knock-knock', 'general') and returns a random selection from that category
- **Response:** Array containing a joke matching the specified category

#### **Bulk Fetching**
- **Endpoint:** `/jokes/random/{count}`
- **Process:** The API returns multiple random jokes in a single request
- **Response:** Array of jokes with the specified count

### 3. **HTTP Request Flow**

```
┌─────────────────────────────────────────────────────┐
│  JokeGenerator Application (Node.js)                │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Uses axios library to make
                  │ HTTP GET requests
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  Official Joke API Server                           │
│  (official-joke-api.appspot.com)                    │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ Returns JSON response with:
                  │ - setup (joke introduction)
                  │ - punchline (joke conclusion)
                  │ - type (joke category)
                  │ - id (unique identifier)
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  Response Parsing & Formatting                      │
│  (Combine setup + punchline for display)            │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
            Display to User
```

### 4. **Key Technologies**

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime for executing the application |
| **Axios** | HTTP client for making API requests with error handling |
| **Official Joke API** | External data source providing joke content |
| **JSON** | Data format for API responses |

### 5. **Error Handling**

The generator includes robust error handling:
- **Network Failures:** Catches connection errors and returns user-friendly messages
- **API Timeouts:** Handles slow or unresponsive API requests
- **Invalid Categories:** Manages requests for non-existent joke categories
- **Empty Responses:** Validates API responses before processing

## Installation

```bash
# Clone the repository
git clone https://github.com/noahnemo-rgb/JokeGenerator.git
cd JokeGenerator

# Install dependencies
npm install
```

## Usage

### Run the Generator

```bash
npm start
```

Output:
```
=== Random Joke Generator ===

📝 Random Joke:
Why do programmers prefer dark mode?
Because light attracts bugs!

---

💻 Programming Joke:
How many programmers does it take to change a light bulb?
None, that's a hardware problem!

---

🎭 Five Random Jokes:
[5 random jokes displayed]
```

### Run Tests

```bash
npm test
```

### Use as a Module

```javascript
const { getRandomJoke, getJokeByCategory, getMultipleJokes } = require('./index');

// Get a random joke
const joke = await getRandomJoke();
console.log(joke);

// Get a specific category joke
const progJoke = await getJokeByCategory('programming');
console.log(progJoke);

// Get multiple jokes
const jokes = await getMultipleJokes(5);
jokes.forEach((joke, i) => console.log(`${i + 1}. ${joke}`));
```

## API Reference

### `getRandomJoke()`
Fetches a single random joke from the entire database.

**Returns:** `Promise<string>` - A formatted joke with setup and punchline.

**Example:**
```javascript
const joke = await getRandomJoke();
// Output: Why did the scarecrow win an award?\nBecause he was outstanding in his field!
```

### `getJokeByCategory(category)`
Fetches a random joke from a specific category.

**Parameters:**
- `category` (string): Joke category (e.g., 'general', 'knock-knock', 'programming')

**Returns:** `Promise<string>` - A formatted joke with setup and punchline.

**Example:**
```javascript
const joke = await getJokeByCategory('programming');
// Output: How many programmers does it take to change a light bulb?\nNone, that's a DevOps problem!
```

### `getMultipleJokes(count)`
Fetches multiple random jokes in a single API call.

**Parameters:**
- `count` (number, default: 5): Number of jokes to fetch

**Returns:** `Promise<string[]>` - Array of formatted jokes.

**Example:**
```javascript
const jokes = await getMultipleJokes(3);
// Output: Array of 3 jokes
```

## Available Categories

- `general` - General/clean jokes
- `knock-knock` - Knock-knock jokes
- `programming` - Programming and tech humor

## Project Structure

```
JokeGenerator/
├── index.js          # Main module with joke fetching functions
├── package.json      # Project metadata and dependencies
├── test.js           # Test suite for all functions
└── README.md         # Project documentation (this file)
```

## How It Works: Step-by-Step

1. **User initiates a request** (either via CLI or as a module import)
2. **Application creates HTTP request** using axios to Official Joke API
3. **API processes request** and selects appropriate joke(s)
4. **API returns JSON response** containing joke data
5. **Application parses response** and formats joke for display
6. **Formatted joke displayed** to user or returned as string/array
7. **Error handling** catches any issues and returns user-friendly messages

## Performance Characteristics

- **Single joke fetch:** ~100-500ms (API latency)
- **Multiple jokes fetch:** ~200-800ms (depends on requested count)
- **No caching:** Fresh jokes on every request
- **Rate limiting:** Official Joke API allows unlimited requests

## Limitations & Notes

- Requires active internet connection
- Dependent on Official Joke API availability
- No offline joke support
- Joke selection is randomized by the API (no guarantee of unique jokes)

## License

MIT

## Contributing

Feel free to fork, modify, and improve this project!

---

**Made with ❤️ by noahnemo-rgb**
