# Electron + React + TypeScript + Vite Template

A modern Electron application template with React, TypeScript, and Vite for fast development and build.

## Features

- ⚡ **Vite** for fast development and building
- ⚛️ **React 19** with hooks support
- 📝 **TypeScript** for type safety
- 🔒 **Secure** preload script setup with context isolation
- 🛠️ **ESLint** for code quality
- 📦 **Electron Builder** for cross-platform packaging

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the application in development mode:

```bash
npm run dev
```

This will start both the Vite dev server and Electron in parallel.

### Building

Build the application for production:

```bash
npm run build
```

### Distribution

Create distributable packages:

```bash
# For Windows (MSI)
npm run dist:win

# For Linux (AppImage)
npm run dist:linux
```

## Project Structure

```text
src/
├── electron/          # Electron main process
│   ├── main.ts        # Main process entry
│   ├── preload.ts     # Preload script for IPC
│   └── util.ts        # Utility functions
└── renderer/          # React frontend
    ├── App.tsx        # Main React component
    ├── main.tsx       # React entry point
    └── assets/        # Static assets
```

## Code Quality & Development Tools

This template includes a comprehensive setup for code quality and development:

### Testing

- **Jest** with TypeScript support
- **React Testing Library** for component testing
- **jsdom** environment for DOM testing
- Pre-configured test utilities and mocks

### Code Formatting & Linting

- **Prettier** for consistent code formatting
- **ESLint** with TypeScript and React rules
- **lint-staged** for pre-commit formatting

### Git Hooks & Commit Standards

- **Husky** for git hooks management
- **Commitlint** with conventional commit format
- Pre-commit hooks for linting and formatting
- Commit message validation

### VSCode Integration

- Recommended extensions
- Debug configurations for Electron and tests
- Workspace settings for optimal development
- Tasks for common operations

## Security

This template implements Electron security best practices:

- Context isolation enabled
- Node integration disabled in renderer
- Secure preload script for IPC communication

## Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Building & Distribution

- `npm run transpile:electron` - Compile Electron TypeScript
- `npm run dist:win` - Create Windows installer
- `npm run dist:linux` - Create Linux package

### Git Hooks

- `npm run lint-staged` - Run lint-staged (used by pre-commit hook)
- `npm run prepare` - Setup Husky git hooks

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
