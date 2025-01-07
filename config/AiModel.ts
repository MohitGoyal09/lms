const { GoogleGenerativeAI } = require("@google/generative-ai");

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

export const GenerateStudyTypeContent = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a JSON-formatted response on the topic: Fibrite Fundamentals User Interface (UI) Development Basic Area. The content should include front and back pairs, similar to flashcards, with a maximum of 15 items. Each item should cover fundamental concepts, widgets, or techniques related to UI development in Flutter. Ensure the response is structured as a JSON object with 'front' and 'back' keys for each item.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "fibrite_ui_fundamentals": [\n    {\n      "front": "What is a \'Widget\' in Flutter?",\n      "back": "The basic building block of a Flutter UI. Everything you see is a widget, from buttons to text to layouts."\n    },\n    {\n      "front": "Explain \'StatelessWidget\'.",\n      "back": "A widget that does not change its state internally. It\'s immutable and the UI depends solely on its properties."\n    },\n     {\n      "front": "Explain \'StatefulWidget\'.",\n      "back": "A widget that can change its internal state, causing the UI to rebuild. It\'s mutable and uses a State object."\n    },\n    {\n      "front": "What is the purpose of the \'build\' method in a widget?",\n      "back": "The method that defines what UI elements should be rendered. It returns a widget tree that describes the UI."\n    },\n    {\n      "front": "What does the \'MaterialApp\' widget do?",\n       "back": "It sets up the basic application configuration, including theme, home page, and navigation settings for a material-designed app."\n    },\n    {\n       "front": "What is \'Scaffold\' widget used for?",\n       "back": "A layout structure providing common UI elements such as app bars, drawers, and bottom navigation."\n    },\n    {\n      "front": "Describe the function of \'Container\'.",\n      "back": "A basic widget that can be used for layout purposes. It can have padding, margin, borders, and decorations."\n    },\n    {\n      "front": "What does \'Text\' widget display?",\n      "back": "Used to render text strings on the screen. It can be styled using various properties."\n    },\n    {\n       "front": "What are \'Rows\' and \'Columns\' used for?",\n       "back": "Layout widgets. \'Row\' arranges widgets horizontally, and \'Column\' arranges them vertically."\n    },\n    {\n        "front": "Explain the use of \'Expanded\' widget.",\n        "back":"Makes a child of a Row, Column, or Flex expand to fill the available space. It handles the distribution of remaining space."\n    },\n      {\n      "front": "What\'s \'Padding\' in layout?",\n        "back": "Space around the inside of a widget to create a gap between the widget and its content."\n    },\n    {\n      "front": "Explain \'Margin\' in layout?",\n      "back": "Space around the outside of a widget, separating it from other widgets."\n    },\n    {\n      "front": "What is a \'Button\' widget?",\n      "back": "A tappable UI element that triggers an action when pressed. Examples include ElevatedButton, TextButton."\n    },\n     {\n      "front": "What\'s the purpose of \'ListView\'?",\n      "back": "A scrollable list of widgets. Useful for displaying collections of items, providing options for different list types."\n    },\n    {\n      "front": "Explain the usage of \'Image\' widget.",\n      "back": "Used to display images from various sources such as assets, network, or files. Supports various image formats."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateQuizAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Quiz on topic :  Flutter Fundamentals , User Interface(UI) Devlopment , Basic App Navigation with Question and Options along with correct answer in JSON format , (Max 10)",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "quizTitle": "Flutter Fundamentals & Basic UI/Navigation",\n  "questions": [\n    {\n      "questionId": 1,\n      "question": "What is the primary programming language used for Flutter development?",\n      "options": [\n        "Java",\n        "Kotlin",\n        "Dart",\n        "Swift"\n      ],\n      "correctAnswer": "Dart"\n    },\n     {\n      "questionId": 2,\n      "question": "Which widget is the foundation for building the user interface in Flutter?",\n      "options": [\n        "Container",\n        "Text",\n        "Widget",\n        "LayoutBuilder"\n      ],\n      "correctAnswer": "Widget"\n    },\n    {\n      "questionId": 3,\n       "question": "Which widget is commonly used to create a rectangular box with padding, margin, and decoration?",\n      "options": [\n        "Column",\n        "Row",\n        "Container",\n        "Stack"\n      ],\n      "correctAnswer": "Container"\n    },\n    {\n      "questionId": 4,\n      "question": "What is the purpose of the `setState()` method in Flutter?",\n      "options": [\n        "To create a new widget",\n        "To update the UI by rebuilding the widget tree",\n        "To delete a widget",\n         "To navigate to another screen"\n      ],\n      "correctAnswer": "To update the UI by rebuilding the widget tree"\n    },\n     {\n      "questionId": 5,\n      "question": "What is the main purpose of a \'Column\' widget?",\n      "options": [\n          "To arrange widgets horizontally",\n          "To arrange widgets vertically",\n          "To overlap widgets on each other",\n          "To create a scrollable view"\n      ],\n      "correctAnswer": "To arrange widgets vertically"\n    },\n     {\n        "questionId": 6,\n        "question": "Which widget is used to navigate between different screens in a Flutter application?",\n        "options": [\n          "Container",\n          "Navigator",\n          "AppBar",\n          "TextButton"\n        ],\n        "correctAnswer": "Navigator"\n      },\n      {\n        "questionId": 7,\n         "question": "Which property of the \'MaterialApp\' widget is used to set the initial route of the application?",\n        "options": [\n            "theme",\n            "home",\n            "routes",\n            "initialRoute"\n        ],\n       "correctAnswer":"initialRoute"\n     },\n     {\n        "questionId": 8,\n        "question": "What is the purpose of the \'pushNamed\' method in the Navigator?",\n         "options": [\n             "To remove the current screen from the stack",\n            "To navigate to a new screen and add it to the stack",\n            "To replace the current screen with a new one",\n            "To return to the previous screen"\n         ],\n         "correctAnswer":"To navigate to a new screen and add it to the stack"\n     },\n      {\n        "questionId": 9,\n        "question": "Which widget is commonly used to display a list of items in a scrollable view?",\n        "options":[\n            "Column",\n            "Row",\n            "ListView",\n            "Stack"\n        ],\n        "correctAnswer": "ListView"\n      },\n      {\n        "questionId": 10,\n         "question": "What is the purpose of a stateful widget in Flutter?",\n         "options": [\n            "To display static content only",\n            "To hold the data that changes over time",\n            "To handle user interactions",\n            "To define the app\'s theme"\n         ],\n        "correctAnswer": "To hold the data that changes over time"\n      }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateQuestionAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a set of question-answer pairs on the topic:  Flutter Fundamentals , User Interface(UI) Devlopment , Basic App Navigation with each pair including a question and its correct answer in JSON format (maximum of 20 pairs).",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "question": "What is Flutter?",\n    "answer": "Flutter is Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase."\n  },\n  {\n    "question": "What is a Widget in Flutter?",\n    "answer": "A Widget is the basic building block of Flutter\'s UI. Everything you see on the screen is a Widget, such as buttons, text, and containers."\n  },\n  {\n     "question": "Name two types of widgets in Flutter",\n     "answer": "StatelessWidget and StatefulWidget"\n   },\n  {\n    "question": "What is the purpose of a StatelessWidget?",\n    "answer": "A StatelessWidget is a widget that describes part of the user interface by building a constellation of other widgets that will not change over time."\n  },\n  {\n    "question": "What is the purpose of a StatefulWidget?",\n    "answer": "A StatefulWidget is a widget that has mutable state. It can rebuild its UI multiple times based on changes in its internal state."\n  },\n  {\n    "question": "What is the `build` method in a Flutter Widget?",\n    "answer": "The `build` method is a required method in every Flutter widget. It returns the widget tree that represents the UI of that widget."\n  },\n {\n    "question": "What is the purpose of `MaterialApp` widget?",\n    "answer": "The `MaterialApp` widget is the root of most Flutter applications. It sets the overall theming, navigation, and behavior for the app."\n  },\n  {\n    "question": "What is a `Scaffold` widget?",\n     "answer": "The `Scaffold` widget provides the basic structure for a screen, including an app bar, drawer, and body."\n   },\n    {\n      "question": "How do you change the background color of a screen in Flutter?",\n      "answer": "You can set the `backgroundColor` property of the `Scaffold` widget."\n    },\n  {\n    "question": "What widget is used to display text in Flutter?",\n    "answer": "The `Text` widget is used to display text."\n  },\n  {\n     "question":"How do you add padding around a Widget?",\n     "answer": "You use the `Padding` widget and specify the padding value."\n   },\n {\n    "question": "How do you align a widget within its parent?",\n    "answer": "You can use the `Alignment` property within a `Container` or by using an `Align` widget."\n   },\n {\n    "question":"What is the `Navigator` class used for in Flutter?",\n     "answer": "The `Navigator` class is used to manage app navigation, allowing you to move between screens."\n   },\n    {\n     "question": "What method is used to push a new route (screen) onto the navigator?",\n     "answer": "The `Navigator.push()` method is used."\n   },\n   {\n     "question": "What method is used to remove the current route and go back to the previous one?",\n     "answer": "The `Navigator.pop()` method is used."\n   },\n  {\n    "question": "What is a route in Flutter navigation?",\n    "answer": "A route represents a screen in the application and is used by the `Navigator` to transition between different screens."\n  },\n    {\n     "question": "How do you pass data between screens when navigating?",\n     "answer":"Data can be passed using the `arguments` parameter in `Navigator.push()` or by passing data to the constructor of the screen\'s widget."\n   },\n  {\n    "question": "What is a named route in Flutter?",\n    "answer": "A named route is a string identifier associated with a specific screen. You can navigate to named routes using `Navigator.pushNamed()`."\n  },\n   {\n    "question": "What is the purpose of the `main()` function in Flutter?",\n    "answer": "The `main()` function is the entry point for the Flutter application and is where the `runApp()` function is called to start the app."\n  },\n  {\n    "question":"What is hot reload in Flutter?",\n    "answer":"Hot reload allows you to quickly see the effects of code changes without restarting the application, by injecting new code into the running Dart Virtual Machine (VM)."\n  }\n]\n```',
        },
      ],
    },
  ],
});
