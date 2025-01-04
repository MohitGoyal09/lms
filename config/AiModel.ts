const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


 export const courseOutline = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate a study material for Python for Exam and level of difficulty will be EASY with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter. All result in JSON format\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "course_title": "Introduction to Python Programming (Easy Level)",\n  "course_summary": "This course provides a beginner-friendly introduction to Python programming. It covers the fundamental concepts necessary to start writing basic Python scripts, focusing on clear explanations and practical examples. The aim is to equip learners with a solid foundation for further exploration of Python\'s capabilities.",\n  "difficulty": "Easy",\n  "chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_title": "Getting Started with Python",\n      "chapter_summary": "This chapter introduces Python and its installation. It also covers writing your first Python program and understanding basic syntax.",\n      "topics": [\n        "What is Python?",\n        "Why learn Python?",\n        "Setting up Python (installation)",\n        "Running your first Python program (\'Hello, World!\')",\n        "Basic Python syntax (comments, indentation)"\n      ]\n    },\n    {\n      "chapter_number": 2,\n      "chapter_title": "Variables and Data Types",\n      "chapter_summary": "This chapter explores variables, how to store values, and the common data types in Python like numbers, strings, and booleans.",\n      "topics": [\n        "What are variables?",\n        "Naming variables (rules and conventions)",\n        "Assigning values to variables",\n        "Different data types: integers (int), floats (float), strings (str), booleans (bool)",\n        "Type checking using type() function"\n      ]\n    },\n     {\n      "chapter_number": 3,\n      "chapter_title": "Basic Input and Output",\n      "chapter_summary": "This chapter focuses on taking input from the user and displaying output to the console using built-in functions.",\n        "topics": [\n        "The `print()` function (displaying output)",\n         "String formatting with f-strings or .format()",\n        "The `input()` function (taking user input)",\n        "Converting input to different data types using int(), float() functions",\n         "Simple Input output programs"\n      ]\n     },\n    {\n      "chapter_number": 4,\n      "chapter_title": "Operators in Python",\n      "chapter_summary": "This chapter covers various types of operators used in Python for mathematical calculations, comparisons and logical operations.",\n      "topics": [\n        "Arithmetic operators (+, -, *, /, %, //, **)",\n        "Comparison operators (==, !=, >, <, >=, <=)",\n        "Logical operators (and, or, not)",\n        "Operator precedence",\n         "Example with all the operators"\n      ]\n    },\n    {\n      "chapter_number": 5,\n      "chapter_title": "Conditional Statements",\n      "chapter_summary": "This chapter introduces conditional statements (`if`, `elif`, `else`) to control the flow of execution based on conditions.",\n      "topics": [\n        "The `if` statement",\n        "The `if...else` statement",\n        "The `if...elif...else` statement",\n        "Nested `if` statements",\n        "Writing simple conditional programs"\n      ]\n    },\n    {\n      "chapter_number": 6,\n      "chapter_title": "Introduction to Loops",\n      "chapter_summary": "This chapter introduces two types of loops (`for` and `while`) to repeatedly execute a block of code.",\n      "topics": [\n        "The `for` loop (iterating over a sequence)",\n         "using `range()` function with `for` loop",\n        "The `while` loop (iterating until a condition is met)",\n        "Controlling the loop using `break` and `continue` statements",\n         "Simple programs using loops"\n      ]\n    },\n    {\n        "chapter_number":7,\n        "chapter_title":"Working with Strings",\n        "chapter_summary":"This chapter focuses on strings and different string manipulation methods in python.",\n        "topics":[\n          "String indexing and slicing",\n          "String methods like upper(), lower(), strip(), replace(), split(), join()",\n          "String concatenation",\n           "Basic string manipulation programs"\n        ]\n    }\n\n  ]\n}\n```\n',
          },
        ],
      },
    ],
  });
export const generateNotes = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate exam material detail content for each chapter, Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag), The chapters:\n{\n      "chapter_number": 1,\n      "chapter_title": "Lists and Tuples",\n      "chapter_summary": "This chapter covers two fundamental sequence data structures in Python: lists (mutable) and tuples (immutable), including operations, and methods.",\n      "topics": [\n        "Introduction to lists",\n        "Creating lists, Accessing list elements",\n        "List slicing",\n        "Modifying lists (appending, inserting, removing)",\n        "List methods",\n        "Introduction to tuples",\n        "Creating tuples and Accessing tuple elements",\n        "Tuple immutability",\n        "List vs Tuple and Use cases"\n      ]\n    },',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```html\n    <div>\n        <h2>Chapter 1: Lists and Tuples</h2>\n        <p>This chapter focuses on understanding and utilizing lists and tuples, two crucial sequence data structures in Python. Lists are mutable, allowing for modification, while tuples are immutable, ensuring data integrity. The content will cover creating, accessing, modifying, and using methods related to these data structures, along with a comparison of their features and suitable use cases.</p>\n\n        <h3>Topics:</h3>\n\n        <h4>1. Introduction to Lists</h4>\n        <p>\n            <ul>\n                <li>Definition of a list as a mutable, ordered sequence of items.</li>\n                <li>Understanding that lists can store items of different data types.</li>\n                <li>Contrast lists with other data structures (briefly).</li>\n            </ul>\n        </p>\n\n        <h4>2. Creating Lists, Accessing List Elements</h4>\n         <p>\n            <ul>\n              <li>Methods for creating lists: using square brackets `[]`, with values or empty.</li>\n              <li>Using the list() constructor to create a list from other iterables.</li>\n              <li>Accessing elements using their zero-based index.</li>\n              <li>Handling index out of range errors.</li>\n              <li>Accessing elements using negative indexing.</li>\n            </ul>\n         </p>\n         \n        <h4>3. List Slicing</h4>\n         <p>\n           <ul>\n             <li>Understanding the concept of list slicing to extract portions of a list.</li>\n             <li>Using the `[start:end]` notation for basic slicing.</li>\n             <li>Slicing with a step: `[start:end:step]`.</li>\n             <li>Omitting the start, end, and step values in slicing.</li>\n             <li>Creating a copy of a list using slicing.</li>\n           </ul>\n        </p>\n\n        <h4>4. Modifying Lists (Appending, Inserting, Removing)</h4>\n        <p>\n            <ul>\n                <li>Using the <code>append()</code> method to add elements to the end of a list.</li>\n                <li>Using the <code>insert()</code> method to add elements at a specific index.</li>\n                <li>Removing elements using <code>remove()</code>, specifying the value.</li>\n                <li>Removing elements using <code>pop()</code>, by index (and retrieving the popped element).</li>\n                <li>Deleting elements or entire slices using the `del` statement.</li>\n                <li>Clearing all elements from a list using `clear()`.</li>\n                <li>Extending a list using `extend()` or concatenation `+`.</li>\n\n            </ul>\n        </p>\n\n        <h4>5. List Methods</h4>\n        <p>\n            <ul>\n              <li>Detailed coverage of common list methods: `append()`, `insert()`, `remove()`, `pop()`, `clear()`, `index()`, `count()`, `sort()`, `reverse()`, `copy()`.</li>\n              <li>Practical examples demonstrating the usage of each method.</li>\n              <li>Difference between methods that modify the list in place vs. those returning a new list or value.</li>\n            </ul>\n        </p>\n\n       <h4>6. Introduction to Tuples</h4>\n       <p>\n         <ul>\n          <li>Definition of a tuple as an immutable, ordered sequence of items.</li>\n          <li>Understanding that tuples can store items of different data types.</li>\n          <li>Contrasting tuples with lists in terms of mutability.</li>\n          </ul>\n       </p>\n\n        <h4>7. Creating Tuples and Accessing Tuple Elements</h4>\n        <p>\n            <ul>\n                <li>Methods for creating tuples: using parentheses `()` with values or empty.</li>\n                <li>Using the tuple() constructor to create a tuple from other iterables.</li>\n                <li>Accessing tuple elements using zero-based indices.</li>\n                <li>Handling index out of range errors.</li>\n                 <li>Accessing elements using negative indexing.</li>\n            </ul>\n        </p>\n\n        <h4>8. Tuple Immutability</h4>\n        <p>\n            <ul>\n              <li>Understanding the concept of immutability and its implications for tuples.</li>\n                <li>Demonstrating that elements within a tuple cannot be modified or removed after creation.</li>\n              <li>Understanding that new tuple needs to be created if change is required</li>\n            </ul>\n        </p>\n\n        <h4>9. List vs Tuple and Use Cases</h4>\n        <p>\n            <ul>\n              <li>Comparing lists and tuples side-by-side in terms of mutability, performance, and usage scenarios.</li>\n              <li>Identifying when to use a list (mutable data, dynamic changes) vs. when to use a tuple (fixed data, data integrity).</li>\n              <li>Examples of suitable use cases for lists (e.g., storing a collection of items that can change) and for tuples (e.g., representing coordinates or records).</li>\n            </ul>\n        </p>\n    </div>\n```\n",
        },
      ],
    },
  ],
});

