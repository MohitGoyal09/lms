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


