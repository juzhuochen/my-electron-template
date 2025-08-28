# Claude Code Project Context

This document provides context for Claude Code to understand and work with this Electron project effectively.

## Project Overview

This is a modern Electron application template built with React, TypeScript, and Vite. It includes comprehensive development tools for code quality, testing, and productivity.

### Tech Stack

- **Electron**: ^37.4.0 (Desktop application framework)
- **React**: ^19.1.1 (UI library)
- **TypeScript**: ~5.9.2 (Type safety)
- **Vite**: ^7.1.3 (Build tool and dev server)

### Key Architecture Decisions

- **ES Modules**: Project uses `"type": "module"` in package.json
- **Separate processes**: Main process (`src/electron/`) and renderer process (`src/renderer/`)
- **Security-first**: Context isolation enabled, node integration disabled
- **Modern tooling**: Vite for fast development, comprehensive linting and testing setup

## Project Structure

```
├── src/
│   ├── electron/           # Electron main process
│   │   ├── main.ts        # Application entry point
│   │   ├── preload.ts     # Secure IPC bridge
│   │   ├── util.ts        # Utility functions
│   │   └── tsconfig.json  # Electron-specific TS config
│   ├── renderer/          # React frontend (renderer process)
│   │   ├── App.tsx        # Main React component
│   │   ├── App.test.tsx   # Component tests
│   │   ├── main.tsx       # React entry point
│   │   ├── App.css        # Component styles
│   │   ├── index.css      # Global styles
│   │   └── assets/        # Static assets
│   └── test/              # Test utilities and setup
│       ├── setup.ts       # Jest test setup
│       └── utils.ts       # Testing utilities
├── dist-electron/         # Compiled Electron code (gitignored)
├── dist-react/           # Built React app (gitignored)
├── .husky/               # Git hooks
├── .vscode/              # VSCode configuration
├── __mocks__/            # Jest mocks
└── node_modules/         # Dependencies (gitignored)
```

## Development Workflow

### Starting Development

```bash
npm run dev  # Starts both Vite dev server and Electron
```

This runs two processes in parallel:

- Vite dev server on <http://localhost:3247>
- Electron application loading from localhost in dev mode

### Building for Production

```bash
npm run build           # Build React app
npm run dist:win        # Create Windows installer
npm run dist:linux      # Create Linux AppImage
```

### Code Quality Commands

```bash
npm run lint            # Check code with ESLint
npm run lint:fix        # Auto-fix ESLint issues
npm run format          # Format code with Prettier
npm run type-check      # Run TypeScript checks
npm test               # Run Jest tests
npm run test:coverage  # Run tests with coverage
```

## Key Configuration Files

### Development Tools

- **ESLint**: `eslint.config.js` - Linting rules for TypeScript and React
- **Prettier**: `.prettierrc` - Code formatting configuration
- **Jest**: `jest.config.js` - Testing framework setup
- **Husky**: `.husky/` - Git hooks for pre-commit checks
- **lint-staged**: `.lintstagedrc.json` - Pre-commit file processing
- **Commitlint**: `commitlint.config.js` - Conventional commit format

### Build Configuration

- **Vite**: `vite.config.ts` - Build tool configuration
- **Electron Builder**: `electron-builder.json` - Packaging configuration
- **TypeScript**: `tsconfig.json`, `tsconfig.node.json`, `src/electron/tsconfig.json`

## Security Implementation

The project follows Electron security best practices:

1. **Context Isolation**: Enabled in `main.ts`
2. **Node Integration**: Disabled for renderer process
3. **Preload Script**: Secure IPC communication via `preload.ts`
4. **CSP Ready**: Structure supports Content Security Policy

### IPC Communication Pattern

```typescript
// In preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // Add more secure APIs here
});

// In renderer (React components)
window.electronAPI.openFile();
```

## Testing Strategy

### Unit Testing

- **Jest** with TypeScript support
- **React Testing Library** for component testing
- **jsdom** environment for DOM testing
- Test files: `*.test.tsx` or `*.spec.tsx`

### Test Coverage

- Configured to collect coverage from `src/renderer/**/*.{ts,tsx}`
- Excludes type definitions and main entry point
- Run with `npm run test:coverage`

### Mocking

- File mocks in `__mocks__/fileMock.js` for assets
- Electron API mocks in `src/test/utils.ts`

## Common Development Tasks

### Adding New Dependencies

```bash
# Production dependencies
npm install package-name

# Development dependencies
npm install -D package-name
```

### Creating New Components

1. Create in `src/renderer/components/`
2. Add corresponding test file
3. Export from index file if needed
4. Import and use in App.tsx or other components

### Adding Electron APIs

1. Add IPC handlers in `src/electron/main.ts`
2. Expose secure APIs in `src/electron/preload.ts`
3. Use APIs in React components via `window.electronAPI`

### Running Specific Tests

```bash
npm test -- --testNamePattern="App Component"
npm test -- --watch  # Watch mode
npm test -- App.test.tsx  # Specific file
```

## Troubleshooting

### Common Issues

1. **`__dirname` not defined**: Use `fileURLToPath(import.meta.url)` in ES modules
2. **Electron not loading**: Check if Vite dev server is running on port 3247
3. **TypeScript errors**: Run `npm run type-check` to see all TS issues
4. **Test failures**: Ensure Jest config matches your file structure
5. **Build failures**: Check that all imports are correctly typed and exist

### Development Server Issues

- Vite dev server must be running before Electron starts
- Port 3247 must be available
- If port conflicts, update `vite.config.ts` and `main.ts`

### Git Commit Issues

- Use conventional commit format: `type: description`
- Pre-commit hooks will auto-format and lint code
- Commit messages are validated by commitlint

## Performance Considerations

### Development

- Hot Module Replacement (HMR) enabled via Vite
- TypeScript compilation is handled by Vite for renderer, tsc for main process
- ESLint and Prettier run on save in VSCode

### Production

- Tree shaking enabled via Vite
- TypeScript strict mode enforced
- Bundle analysis available via Vite build

## Deployment Notes

### Windows

- Creates MSI installer via electron-builder
- Icon: `icon.png` in project root
- App ID: `com.example.electron-course` (update in `electron-builder.json`)

### Linux

- Creates AppImage via electron-builder
- Category: Utility (configurable in `electron-builder.json`)

### Code Signing

- Not configured by default
- Add signing configuration to `electron-builder.json` for distribution

---

_This document is maintained to help Claude Code understand the project structure and make informed decisions when assisting with development tasks._
