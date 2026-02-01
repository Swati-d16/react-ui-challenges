# React UI Challenges 🚀

A collection of interactive React components built to strengthen core frontend concepts such as **state management, hooks, form handling, persistence, UI synchronization, and dynamic styling**.

This repository contains multiple mini-projects that simulate real-world frontend scenarios and are ideal for interview preparation and hands-on practice.

---

## 🛠 Tech Stack

* **React (Hooks)**
* **JavaScript (ES6+)/Typescript**
* **CSS / Tailwind CSS**
* **LocalStorage**
* **HTML5**

---

## 📌 Projects Overview

---

## ✅ Task 1: Todo Application 

<img width="1919" height="883" alt="image" src="https://github.com/user-attachments/assets/edd96960-174d-433e-9dae-d81122f597b6" />


### Core Features (Day 1)

* Add new tasks using a form
* Display tasks using component mapping
* Delete individual tasks
* Mark tasks as completed with visual UI updates

### Advanced Features (Day 2)

* Persist tasks using **localStorage**
* Filter tasks:

  * All
  * Active
  * Completed
* Assign priority levels to tasks
* Clean and responsive UI using modern styling techniques

### Concepts Covered

* `useState`, `useEffect`
* Conditional rendering
* List rendering & key handling
* Local storage persistence

---

## 📝 Task 2: Form Handling & Password Toggle 

<img width="1919" height="853" alt="image" src="https://github.com/user-attachments/assets/99739a9b-d2f9-4628-bce4-d8008f7b9c63" />


### Features

* Form fields:

  * Name
  * Email
  * ID
  * Password
* Prevent page reload on submit
* Display submitted form data below the form
* Toggle password visibility (password ↔ text)
* Inline validation:

  * All fields required
  * Valid email format
* Clear form after successful submission

### Concepts Covered

* Controlled components
* Form validation
* Event handling
* Conditional UI rendering

---

## 📊 Task 3: Dynamic Progress Bar 
<img width="1913" height="888" alt="image" src="https://github.com/user-attachments/assets/863afd34-f476-4418-86e1-8f5af258d067" />


### Features

* Multiple numeric input fields (0–100)
* One main progress bar reflecting overall progress
* Sub-bars for each input value
* Real-time updates and animations
* Automatic value correction:

  * < 0 → 0
  * > 100 → 100
* Dynamic color changes:

  * 🔴 Red (< 40%)
  * 🟡 Yellow (40–70%)
  * 🟢 Green (> 70%)

### Concepts Covered

* Derived state
* UI synchronization
* Inline styles & animations
* Input validation

---

## ⏱ Task 4: Advanced Countdown Timer System

<img width="1919" height="838" alt="image" src="https://github.com/user-attachments/assets/bedd0fd5-f387-4cae-83d3-c424ff138707" />


### Timer Configuration

* Input to set initial time (default: 10 seconds)
* Accepts only positive integers
* Input disabled while timer is running

### Controls

* **Start** – Begins countdown
* **Pause** – Pauses without resetting
* **Resume** – Continues from paused time
* **Reset** – Stops and resets timer

### Behavior Rules

* Buttons enable/disable based on timer state
* Prevent multiple timers from running simultaneously
* Display remaining time up to milliseconds
* Show timer status:

  * Running
  * Paused
  * Completed

### Completion Logic

* Automatically stops at 0
* Displays **“Time’s up!”**
* Start button hidden permanently after completion

### Persistence

* Timer state persists on page refresh
* Countdown resumes from correct remaining time

### Concepts Covered

* `setInterval` & cleanup
* Persistent state
* Complex UI state transitions

---

## 🔍 Task 5: Live Search with Highlighting 

<img width="1310" height="846" alt="image" src="https://github.com/user-attachments/assets/fc7dfa9f-2866-438e-88f7-2d4fa9e66a90" />


### Features

* Search through a predefined list of names
* Case-insensitive filtering
* Highlight matching text in **bold**
* Highlight multiple occurrences
* Display match count
* Show **“No matches found”** when applicable

### Concepts Covered

* String manipulation
* Conditional rendering
* Dynamic highlighting
* Performance-friendly filtering

---

## 🎯 Learning Outcomes

* Strong understanding of **React hooks**
* Real-world UI state handling
* Form validation and controlled inputs
* Persistent state using browser storage
* Clean, reusable component design

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/react-ui-challenges.git
cd react-ui-challenges
npm install
npm start
```
