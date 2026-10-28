# 🚀 CodePath - Modern Coding Education & Daily Roadmap Platform

**CodePath** is a modern, responsive, mobile-first coding education web application built with **React, TypeScript, Vite, Tailwind CSS, and Supabase**. It helps beginners and aspiring software engineers master coding step by step with daily structured curriculums, interactive coding exercises, automated quizzes, streak tracking, and personalized revision recommendations.

---

## 🌟 Key Features

### 1. 📊 Student Dashboard
- **Study Streak Counter**: Visual fire indicator tracking consecutive days of learning.
- **Experience Points (XP) & Levels**: Earn points for completing lessons (+100 XP), passing test cases (+50 XP), and scoring on quizzes.
- **Course Progress Ring**: Real-time percentage completion tracker.
- **Today's Mission Card**: 1-click "Continue Lesson" button that takes you straight to your current day's topic.
- **Weekly Activity Chart**: Visual bar graph showcasing your XP earned from Monday to Sunday.
- **Weak Topic Diagnostician**: Automatically flags topics where quiz questions were missed and suggests 1-click revision.
- **Achievements & Badges**: Unlock milestones such as *First Step*, *Quiz Ace*, *Code Runner*, and *DSA Pioneer*.

### 2. 🎓 5 Comprehensive Course Pathways
1. **Data Structures & Algorithms (DSA)**: 14-day intensive roadmap covering Big-O, Arrays, Strings, Searching, Sorting, Linked Lists, Week 1 Revision Test, Stacks, Queues, Recursion, Hashing, Trees, Graphs, Greedy, and Dynamic Programming.
2. **Full Stack Development**: Modern frontend and backend with React, Node.js, Express, PostgreSQL, and REST APIs.
3. **DevOps & Cloud Engineering**: Linux terminal mastery, Git workflows, Docker containerization, CI/CD with GitHub Actions, Kubernetes, and Monitoring.
4. **Java Programming Mastery**: Core Java, JVM internals, OOP principles, Collections framework, Generics, Streams, and Multithreading.
5. **Python Programming & Beyond**: Pythonic idioms, data structures, OOP, file I/O, and building web APIs with FastAPI.

### 3. 🗓️ Daily Learning & Interactive Roadmaps
- **Chronological Day-by-Day Timeline**: Each day includes clear estimated time, status indicators (Completed, In-Progress, or Locked), and quick review options.
- **Exploration vs. Strict Order**: Toggle between strict sequential unlock or free exploration mode.
- **Deep Conceptual Breakdowns**: Includes real-world mental models, code syntax walk-throughs, and pro engineering tips.

### 4. 💻 In-Browser Coding Playground
- **Live Code Editor**: Write and test JavaScript algorithms directly inside the browser.
- **Automated Test Cases**: Evaluates your code against multiple deterministic test cases, showing input, expected output, and your actual output.
- **Hints System**: Toggle progressive hints if you get stuck on an exercise.
- **Celebration Effects**: Confetti burst upon passing all test cases.

### 5. 📝 MCQ Quizzes & Automatic Scoring
- Interactive questions with multiple choices.
- Immediate scoring and feedback with detailed explanations for correct and incorrect answers.
- Automatically tags incorrect questions to your student profile's weak topic list for targeted revision.

### 6. 📱 Responsive Design & PWA Support
- Professional theme styled with Navy Blue (`#0F172A`), Purple (`#7C3AED`), and Slate accents.
- Responsive for mobile, tablet, and desktop with dedicated mobile bottom navigation.
- PWA manifest (`manifest.webmanifest`) and service worker (`sw.js`) allowing installation directly to the home screen.

### 7. 🔒 Supabase Authentication & Database
- Full PostgreSQL schema in `supabase/schema.sql` with Row Level Security (RLS) policies.
- Dual-engine design: Works completely offline with persistent local storage right out of the box, and seamlessly connects to Supabase when environment keys are added.

---

## 🛠️ Getting Started (Step-by-Step for Beginners)

### Step 1: Open Terminal in the Project Directory
Navigate into the `codepath` project directory:
```bash
cd "C:\Users\UMA\.gemini\antigravity\scratch\codepath"
```

### Step 2: Start the Local Development Server
Run the following command:
```bash
npm run dev
```
*(On Windows PowerShell, you can also use `cmd /c npm run dev`)*

The terminal will display:
```text
  VITE v8.3.4  ready in 704 ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Open in Your Browser
Open your browser and navigate to:
[http://localhost:5173/](http://localhost:5173/)

You can immediately explore the app using the preloaded **Demo Student (Alex Rivera)** or click **Sign In** to create a new profile!

---

## ☁️ Connecting Supabase (Optional for Cloud Sync)

To connect your Supabase database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase project dashboard.
3. Copy the contents of [`supabase/schema.sql`](file:///C:/Users/UMA/.gemini/antigravity/scratch/codepath/supabase/schema.sql) and click **Run**. This will create the `profiles`, `courses`, `lessons`, `quizzes`, `quiz_questions`, and `user_progress` tables with Row Level Security policies.
4. Copy your **Project URL** and **Anon Key** from **Project Settings > API**.
5. Create a `.env` file in the project folder with:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```
6. Restart the dev server (`npm run dev`). CodePath will now authenticate and synchronize with your Supabase cloud database!

---

## 📂 Project Directory Structure

```text
codepath/
├── public/
│   ├── favicon.svg              # App vector icon
│   ├── manifest.webmanifest     # PWA install manifest
│   └── sw.js                    # Service worker for offline caching
├── src/
│   ├── components/
│   │   ├── AuthModal.tsx        # Registration and login modal
│   │   ├── BottomNav.tsx        # Mobile touch navigation
│   │   ├── CodeEditor.tsx       # In-browser live coding editor & test runner
│   │   ├── CourseSelection.tsx  # Track selection cards (5 tracks)
│   │   ├── Dashboard.tsx        # Student stats, streak, today's lesson & weak areas
│   │   ├── LessonView.tsx       # Full lesson viewer with tabs (Theory, Code, Exercise, Quiz)
│   │   ├── Navbar.tsx           # Top navigation with streak, XP, and track switcher
│   │   ├── ProfileModal.tsx     # Student profile & stats modal
│   │   ├── PWAInstallPrompt.tsx # Mobile install banner
│   │   ├── QuizRunner.tsx       # MCQ quiz engine with explanations & scoring
│   │   └── RoadmapView.tsx      # Day-by-day interactive roadmap
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication & progress state management
│   ├── data/
│   │   └── coursesData.ts       # Full 14-day DSA syllabus & tracks data
│   ├── services/
│   │   ├── storage.ts           # Local storage engine, streaks & activity log
│   │   └── supabase.ts          # Supabase client configuration
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── App.tsx                  # Main router and view coordinator
│   ├── index.css                # Tailwind directives and custom scrollbars
│   └── main.tsx                 # React DOM mount point
├── supabase/
│   └── schema.sql               # Production PostgreSQL schema & RLS policies
├── tailwind.config.js           # Navy, purple, and slate color system
├── vite.config.ts               # Vite configuration
└── package.json                 # Dependencies and scripts
```
