const {
  GoogleGenerativeAI,
  
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
          text: 'Generate exam material detail content for each chapter. Make sure to include all topic points in the content. **The generated content for each chapter should be in HTML format (Do not add HTML, Head, Body, title tag) and should be stored under the key "html_content" within a "notes" object for each chapter.** The chapters are:\n[\n  {\n    "chapter_number": 1,\n    "chapter_title": "Lists and Tuples",\n    "chapter_summary": "This chapter covers two fundamental sequence data structures in Python: lists (mutable) and tuples (immutable), including operations, and methods.",\n    "topics": [\n      "Introduction to lists",\n      "Creating lists, Accessing list elements",\n      "List slicing",\n      "Modifying lists (appending, inserting, removing)",\n      "List methods",\n      "Introduction to tuples",\n      "Creating tuples and Accessing tuple elements",\n      "Tuple immutability",\n      "List vs Tuple and Use cases"\n    ]\n  },',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "chapter_number": 1,\n    "chapter_title": "Lists and Tuples",\n    "chapter_summary": "This chapter covers two fundamental sequence data structures in Python: lists (mutable) and tuples (immutable), including operations, and methods.",\n    "topics": [\n      "Introduction to lists",\n      "Creating lists, Accessing list elements",\n      "List slicing",\n      "Modifying lists (appending, inserting, removing)",\n      "List methods",\n      "Introduction to tuples",\n      "Creating tuples and Accessing tuple elements",\n      "Tuple immutability",\n      "List vs Tuple and Use cases"\n    ],\n    "notes": {\n      "html_content": "<h2>Chapter 1: Lists and Tuples</h2>\\n\\n<h3>Introduction to Lists</h3>\\n<p>Lists are ordered, mutable sequences of items. They can hold elements of different data types.</p>\\n\\n<h3>Creating Lists, Accessing List Elements</h3>\\n<p>Lists are created using square brackets <code>[]</code>. Elements are accessed by their index (starting from 0). Negative indices can be used to access elements from the end of the list.</p>\\n<pre><code>my_list = [1, \'hello\', 3.14, True]\\nprint(my_list[0])  # Output: 1\\nprint(my_list[-1]) # Output: True\\n</code></pre>\\n\\n<h3>List Slicing</h3>\\n<p>List slicing allows you to extract a portion of a list using the colon <code>:</code> operator. You can specify start, end, and step.</p>\\n<pre><code>my_list = [10, 20, 30, 40, 50]\\nprint(my_list[1:4])   # Output: [20, 30, 40]\\nprint(my_list[:3])    # Output: [10, 20, 30]\\nprint(my_list[2:])    # Output: [30, 40, 50]\\nprint(my_list[::2])  # Output: [10, 30, 50]\\n</code></pre>\\n\\n<h3>Modifying Lists</h3>\\n<p>Lists are mutable, meaning their elements can be changed.</p>\\n\\n<h4>Appending:</h4>\\n<p>Use <code>append()</code> to add an item to the end of the list.</p>\\n<pre><code>my_list = [1, 2, 3]\\nmy_list.append(4)\\nprint(my_list)  # Output: [1, 2, 3, 4]\\n</code></pre>\\n\\n<h4>Inserting:</h4>\\n<p>Use <code>insert()</code> to insert an item at a specific index.</p>\\n<pre><code>my_list = [1, 2, 3]\\nmy_list.insert(1, 1.5)\\nprint(my_list)  # Output: [1, 1.5, 2, 3]\\n</code></pre>\\n\\n<h4>Removing:</h4>\\n<p>Use <code>remove()</code> to remove the first occurrence of a specific value, or use <code>pop()</code> to remove an item at a specific index (or the last item if no index is given).</p>\\n<pre><code>my_list = [1, 2, 3, 2]\\nmy_list.remove(2)\\nprint(my_list)  # Output: [1, 3, 2]\\n\\nmy_list = [1, 2, 3]\\npopped_item = my_list.pop(1)\\nprint(my_list)  # Output: [1, 3]\\nprint(popped_item) # Output: 2\\n</code></pre>\\n\\n<h3>List Methods</h3>\\n<p>Common list methods include <code>append()</code>, <code>insert()</code>, <code>remove()</code>, <code>pop()</code>, <code>sort()</code>, <code>reverse()</code>, <code>count()</code>, <code>index()</code>, and <code>clear()</code>.</p>\\n\\n<h3>Introduction to Tuples</h3>\\n<p>Tuples are ordered, immutable sequences of items. Like lists, they can contain mixed data types.</p>\\n\\n<h3>Creating Tuples and Accessing Tuple Elements</h3>\\n<p>Tuples are created using parentheses <code>()</code>. Accessing tuple elements is the same as with lists, using indices.</p>\\n<pre><code>my_tuple = (10, \'apple\', 2.5, False)\\nprint(my_tuple[0]) # Output: 10\\nprint(my_tuple[-1]) # Output: False\\n</code></pre>\\n\\n<h3>Tuple Immutability</h3>\\n<p>Tuples are immutable; once created, their elements cannot be changed. Operations like appending, inserting, or removing elements are not allowed.</p>\\n<pre><code>my_tuple = (1, 2, 3)\\n# my_tuple[0] = 4  # This will raise a TypeError\\n</code></pre>\\n\\n<h3>List vs Tuple and Use Cases</h3>\\n<p><b>Lists</b> are used when you need a mutable collection of items, such as when building a list of data, managing a queue, etc.<br><b>Tuples</b> are used when you need an immutable collection, such as for representing fixed records, or return values from functions, where their immutability can guarantee data integrity.</p>"\n    }\n  }\n]\n```\n',
        },
      ],
    },
  ],
});