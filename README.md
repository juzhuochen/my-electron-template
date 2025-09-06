# Electron + React + TypeScript + Vite Template

A production-ready Electron application template with React, TypeScript, and Vite, designed for building commercial desktop applications.

## 🚀 Features

### Core Technologies

- ⚡ **Vite** - Lightning-fast development and building
- ⚛️ **React 19** - Modern UI development with hooks
- 📝 **TypeScript** - Full type safety across main and renderer processes
- 🔌 **Electron 37+** - Latest Electron with security best practices

### Architecture & Patterns

- 🏗️ **Dual TypeScript Configuration** - Separate configs for main and preload scripts
- 📦 **ES Modules Support** - Modern module system with ESM/CJS compatibility
- 🗄️ **SQLite Database** - Built-in local database with better-sqlite3
- 🔒 **Secure IPC** - Type-safe IPC communication with context isolation
- 📊 **Repository Pattern** - Clean data access layer architecture

### Development Experience

- 🛠️ **Code Quality** - ESLint + Prettier + Husky pre-configured
- 🧪 **Testing Suite** - Jest + React Testing Library ready to use
- 📝 **Commit Standards** - Conventional commits with commitlint
- 🔍 **VSCode Integration** - Debug configs and recommended extensions
- 📚 **electron-log** - Structured logging for production

### Production Ready

- 📦 **Cross-Platform Build** - Windows (MSI), macOS (DMG), Linux (AppImage)
- 🔐 **Security First** - Context isolation, node integration disabled
- 🎯 **Type Safety** - End-to-end TypeScript coverage
- 🚀 **Optimized Build** - Production-ready with code splitting

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## 🎯 Quick Start

### Installation

```bash
# Clone the template
git clone https://github.com/yourusername/my-electron-template.git
cd my-electron-template

# Install dependencies
npm install
```

### Development

```bash
# Start development server (React + Electron)
npm run dev
```

### Building

```bash
# Build for production
npm run build

# Create distributable packages
npm run dist:win    # Windows MSI
npm run dist:linux  # Linux AppImage
```

## 📁 Project Structure

```text
src/
├── electron/                # Electron main process
│   ├── main.ts             # Application entry point
│   ├── preload.ts          # Preload script for secure IPC
│   ├── tsconfig.json       # Main process TypeScript config
│   ├── tsconfig.preload.json # Preload TypeScript config (CommonJS)
│   ├── database/           # Database layer
│   │   ├── db.ts          # Database connection
│   │   └── services/      # Data services
│   └── ipc/               # IPC handlers
│       └── dbHandlers.ts  # Database IPC handlers
├── renderer/              # React frontend
│   ├── App.tsx           # Main React component
│   ├── main.tsx          # React entry point
│   ├── electron.d.ts    # Electron API types
│   ├── pages/            # Page components
│   └── services/         # Frontend services
└── shared/               # Shared types and constants
    └── types.ts         # TypeScript interfaces
```

## 🔧 Available Scripts

### Development

- `npm run dev` - Start development environment
- `npm run preview` - Preview production build

### Code Quality

- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - TypeScript type checking

### Testing

- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

### Building & Distribution

- `npm run build` - Build for production
- `npm run transpile:electron` - Compile Electron TypeScript
- `npm run dist:win` - Build Windows installer
- `npm run dist:linux` - Build Linux package

## 🏗️ Architecture Highlights

### Module System Solution

This template solves the ES Modules vs CommonJS compatibility issue with a dual TypeScript configuration:

- **Main Process**: Uses ES Modules (`tsconfig.json`)
- **Preload Script**: Compiles to CommonJS (`tsconfig.preload.json`)
- **Renderer Process**: Uses ES Modules with Vite

### Database Integration

Built-in SQLite database with:

- Type-safe database operations
- Migration support ready
- Repository pattern for data access
- IPC handlers for database queries

### IPC Communication

Type-safe IPC with:

- Centralized event definitions
- Request/response pattern
- Error handling built-in
- TypeScript interfaces for all messages

## 🔒 Security

Implements Electron security best practices:

- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Secure preload script
- ✅ Type-safe IPC communication
- ✅ Content Security Policy ready
- ✅ Remote module disabled

## 🚀 Next Steps for Commercial Applications

See [ROADMAP.md](./ROADMAP.md) for detailed evolution plans including:

- 🔐 Authentication & Authorization
- 🔄 Auto-updater integration
- 🌍 Internationalization (i18n)
- 🎨 Theme system
- 📊 State management
- 🔌 Plugin architecture
- 📈 Analytics & monitoring

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this template for your commercial projects.

## 🙏 Acknowledgments

Built with best practices from:

- [Electron Documentation](https://www.electronjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- VS Code, Discord, and other great Electron apps

---

**Ready to build your next desktop application? Start with this template!** 🚀
