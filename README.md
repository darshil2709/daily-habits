# Daily Habits

A small React Native habit tracker built with Expo and TypeScript. This is a learning project for practising mobile app development, VS Code, Git, and GitHub.

## What it does

- Add a habit to your daily list
- Tap a habit to mark it complete or incomplete
- Remove a habit
- See how many habits are complete
- Keep your habit list and completion states saved on your device between app launches

**Current limitation:** completion states are saved as-is. The app does not yet reset them automatically each day.

## Built with

- React Native
- Expo SDK 58
- TypeScript
- AsyncStorage for on-device persistence

## Run the app

### Requirements

- Node.js and npm
- Git
- Visual Studio Code
- Expo Go on an iOS or Android phone

### Setup

Clone the repository and enter its folder:

```bash
git clone https://github.com/darshil2709/daily-habits.git
cd daily-habits
```

Install the project dependencies:

```bash
npm install
```

Start Expo:

**Windows PowerShell**

```powershell
npx.cmd expo start
```

**macOS, Linux, or Command Prompt**

```bash
npx expo start
```

Scan the QR code with Expo Go to open the app. On a physical iPhone, sign in to Expo Go and Expo CLI with the same Expo account. If the terminal reports that the CLI is not signed in, run `npx.cmd expo login` in PowerShell or `npx expo login` in another shell.

## Where to find the code

- `src/app/index.tsx` — the habit tracker screen, state, actions, persistence, and styles
- `src/app/_layout.tsx` — app navigation and shared screen setup
- `src/app/explore.tsx` — the starter template's Explore tab
- `src/constants/theme.ts` — shared theme and spacing values
- `assets/` — images and icons used by the starter app

## What this project helps you learn

- **TypeScript:** types, arrays, objects, and function parameters
- **React:** components, state with `useState`, and effects with `useEffect`
- **React Native:** text, inputs, buttons, lists, layouts, and styles
- **Persistence:** saving and loading data with AsyncStorage
- **Git:** checking changes, making commits, and pushing them to GitHub

## Useful Git commands

```bash
git status
git add .
git commit -m "Describe your change"
git push
```

Each commit is a named checkpoint in the project history. Push uploads your local commits to GitHub.

## Next improvements

- Reset completion status at the start of a new day
- Let users edit habit names
- Add a weekly progress view
- Add tests for habit actions and persistence
