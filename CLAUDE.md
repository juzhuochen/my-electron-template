# Claude Code Project Context

This document provides context for Claude Code to understand and work with this Electron project effectively.

## Project Overview

This is a production-ready Electron application template built with React, TypeScript, and Vite. It provides a solid foundation for building commercial desktop applications with modern web technologies.

### Tech Stack

- **Electron**: ^37.4.0 (Desktop application framework)
- **React**: ^19.1.1 (UI library with hooks)
- **TypeScript**: ~5.9.2 (Type safety across all processes)
- **Vite**: ^7.1.3 (Fast build tool and dev server)
- **better-sqlite3**: ^12.2.0 (SQLite database)
- **electron-log**: ^6.0.2 (Production logging)

### Key Architecture Decisions

- **ES Modules**: Project uses `"type": "module"` in package.json
- **Dual TypeScript Configuration**: Separate configs for main process and preload script
- **Module System Solution**: Main process uses ESM, preload compiles to CommonJS
- **Database Integration**: SQLite with repository pattern
- **Security-first**: Context isolation enabled, node integration disabled
- **Modern tooling**: Vite for fast development, comprehensive linting and testing setup

## Project Structure

```
├── src/
│   ├── electron/              # Electron main process
│   │   ├── main.ts            # Application entry point
│   │   ├── preload.ts         # Secure IPC bridge (compiles to CommonJS)
│   │   ├── util.ts            # Utility functions
│   │   ├── tsconfig.json      # Main process TypeScript config (ESM)
│   │   ├── tsconfig.preload.json # Preload TypeScript config (CommonJS)
│   │   ├── database/          # Database layer
│   │   │   ├── db.ts          # Database connection & initialization
│   │   │   └── services/      # Data access services
│   │   │       └── appInfoService.ts
│   │   └── ipc/               # IPC handlers
│   │       └── dbHandlers.ts  # Database-related IPC handlers
│   ├── renderer/              # React frontend (renderer process)
│   │   ├── App.tsx            # Main React component
│   │   ├── App.test.tsx       # Component tests
│   │   ├── main.tsx           # React entry point
│   │   ├── electron.d.ts     # Electron API type definitions
│   │   ├── pages/             # Page components
│   │   │   └── page.tsx      # Example page
│   │   ├── services/          # Frontend services
│   │   │   └── appInfoService.ts
│   │   ├── App.css            # Component styles
│   │   ├── index.css          # Global styles
│   │   └── assets/            # Static assets
│   ├── shared/                # Shared between processes
│   │   └── types.ts          # TypeScript interfaces & constants
│   └── test/                  # Test utilities and setup
│       ├── setup.ts           # Jest test setup
│       └── utils.ts           # Testing utilities
├── dist-electron/             # Compiled Electron code (gitignored)
│   ├── electron/              # Main process output
│   └── shared/                # Shared types output
├── dist-react/               # Built React app (gitignored)
├── .husky/                   # Git hooks
├── .vscode/                  # VSCode configuration
├── __mocks__/                # Jest mocks
└── node_modules/             # Dependencies (gitignored)
```

## Module System Architecture

### The Challenge

Electron's preload scripts run in a special context that only supports CommonJS, while modern Node.js and the web use ES Modules.

### The Solution

This template uses dual TypeScript configurations:

1. **Main Process** (`src/electron/tsconfig.json`)
   - Module: `ESNext`
   - Outputs ES Modules
   - Handles: `main.ts`, database, IPC handlers

2. **Preload Script** (`src/electron/tsconfig.preload.json`)
   - Module: `CommonJS`
   - Outputs CommonJS
   - Handles: `preload.ts` only

3. **Build Command**
   ```bash
   npm run transpile:electron
   # Runs: tsc --project src/electron/tsconfig.json && tsc --project src/electron/tsconfig.preload.json
   ```

## Database Layer

### Architecture

- **Database**: SQLite via better-sqlite3
- **Location**: User data directory (`app.db`)
- **Pattern**: Repository pattern for data access
- **Logging**: electron-log for production debugging

### Database Structure

```sql
CREATE TABLE app_info (
    id INTEGER PRIMARY KEY,
    version TEXT NOT NULL,
    creation_date TEXT NOT NULL
);
```

### Adding New Tables

1. Update schema in `src/electron/database/db.ts`
2. Create service in `src/electron/database/services/`
3. Add IPC handler in `src/electron/ipc/`
4. Define types in `src/shared/types.ts`
5. Expose API in `src/electron/preload.ts`

## IPC Communication

### Pattern

Type-safe request/response pattern with centralized event definitions.

### Structure

```typescript
// src/shared/types.ts
export const IPC_EVENTS = {
  GET_APP_INFO: "get-app-info",
  // Add more events here
};

export interface IpcResponse<T> {
  isSuccess: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
  };
}
```

### Adding New IPC Endpoints

1. Define event in `src/shared/types.ts` → `IPC_EVENTS`
2. Create handler in `src/electron/ipc/` → register in `main.ts`
3. Expose in `src/electron/preload.ts`
4. Update types in `src/renderer/electron.d.ts`
5. Use in React via `window.electronAPI`

## Development Workflow

### Starting Development

```bash
npm run dev  # Starts both Vite dev server and Electron
```

This runs two processes in parallel:

- Vite dev server on http://localhost:3247
- Electron application loading from localhost in dev mode

### Building for Production

```bash
npm run build           # Build React app
npm run transpile:electron  # Compile TypeScript
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

### TypeScript Configurations

- `tsconfig.json` - Base configuration
- `tsconfig.node.json` - Node.js specific (Vite config)
- `src/electron/tsconfig.json` - Main process (ESM output)
- `src/electron/tsconfig.preload.json` - Preload script (CommonJS output)

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

## Security Implementation

The project follows Electron security best practices:

1. **Context Isolation**: Enabled in `main.ts`
2. **Node Integration**: Disabled for renderer process
3. **Preload Script**: Secure IPC communication via `preload.ts`
4. **CSP Ready**: Structure supports Content Security Policy
5. **Secure IPC**: All communication goes through defined channels

### IPC Communication Pattern

```typescript
// In preload.ts
contextBridge.exposeInMainWorld("electronAPI", {
  getAppInfo: () => ipcRenderer.invoke(IPC_EVENTS.GET_APP_INFO),
  // Add more secure APIs here
});

// In renderer (React components)
const response = await window.electronAPI.getAppInfo();
if (response.isSuccess) {
  console.log(response.data);
}
```

## Common Development Tasks

### Adding a New Feature

1. **Database**: Add schema/service if needed
2. **IPC**: Create handler for main process communication
3. **Preload**: Expose API securely
4. **Types**: Define interfaces in shared/types.ts
5. **React**: Create component and service
6. **Test**: Add unit tests

### Adding Electron APIs

1. Add IPC handler in `src/electron/ipc/`
2. Register handler in `src/electron/main.ts`
3. Expose API in `src/electron/preload.ts`
4. Add types to `src/renderer/electron.d.ts`
5. Use in React via `window.electronAPI`

### Creating New Components

1. Create in `src/renderer/components/`
2. Add corresponding test file
3. Import and use in App.tsx or pages

## Troubleshooting

### Module System Issues

- **"Cannot use import statement outside a module"**: Check if preload is using CommonJS
- **"exports is not defined"**: Check TypeScript config module settings
- **Module not found**: Ensure `.js` extension in imports for local files

### Common Issues

1. **`__dirname` not defined**: Use `fileURLToPath(import.meta.url)` in ES modules
2. **Electron not loading**: Check if Vite dev server is running on port 3247
3. **TypeScript errors**: Run `npm run type-check` to see all TS issues
4. **Preload script errors**: Check browser DevTools console
5. **Build failures**: Ensure all imports have correct extensions

### Development Server Issues

- Vite dev server must be running before Electron starts
- Port 3247 must be available
- If port conflicts, update `vite.config.ts` and `main.ts`

### Database Issues

- Database file location: `%APPDATA%/electron-template/app.db` (Windows)
- Check electron-log output for database errors
- Ensure proper permissions for user data directory

## Performance Considerations

### Development

- Hot Module Replacement (HMR) enabled via Vite
- TypeScript compilation split between Vite (renderer) and tsc (main)
- Separate compilation for preload script

### Production

- Tree shaking enabled via Vite
- TypeScript strict mode enforced
- Production builds exclude source maps by default
- Logging via electron-log (not console)

## Best Practices

### Code Style

- Use TypeScript strict mode
- Define all types explicitly (avoid `any`)
- Use async/await over callbacks
- Keep main process logic minimal

### Security

- Never expose Node.js APIs directly to renderer
- Validate all IPC inputs
- Use context isolation always
- Define explicit IPC channels

### Performance

- Lazy load heavy components
- Use production builds for testing performance
- Monitor memory usage in main process
- Keep preload script lightweight

---

_This document is maintained to help Claude Code understand the project structure and make informed decisions when assisting with development tasks._
