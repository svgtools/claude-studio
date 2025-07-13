# Claude Studio

A **local-only CLI tool** that visualizes Claude AI data export via a sleek React UI served from a tiny embedded HTTP server.

## Features

- 🔒 **Fully offline** - No telemetry, no external network calls
- 📱 **Clean UI** - Built with React 18 + TypeScript + Tailwind CSS + shadcn/ui
- 🚀 **Fast setup** - Pre-built static assets, zero build time at runtime
- 📊 **Comprehensive view** - Browse conversations, projects, and user data
- 🛡️ **Secure** - Data never leaves your machine

## Installation

```bash
npm install -g claude-studio
```

## Usage

1. **Export your Claude data** from the Claude web app
2. **Extract the export** to a folder containing:
   ```
   claude-export/
   ├── users.json
   ├── projects.json
   └── conversations.json
   ```
3. **Run claude-studio** inside that folder:
   ```bash
   cd claude-export
   npx claude-studio
   ```

The tool will:
- ✅ Validate your export files
- 🚀 Start a local server (default: http://localhost:5173)
- 🌐 Auto-open your browser to the viewer

## What You'll See

- **Left sidebar**: List of all your conversations
- **Right pane**: Selected conversation messages
- **Clean design**: Human messages on the right, Assistant messages on the left
- **Message details**: Timestamps, sender info, and full content

## Development

### Requirements

- Node.js 16+
- npm or yarn

### Setup

```bash
git clone https://github.com/your-username/claude-studio.git
cd claude-studio
npm install
```

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview built application
npm run preview
```

### Project Structure

```
claude-studio/
├── bin/
│   └── claude-studio.js       # CLI entry point
├── src/
│   ├── components/            # React components
│   ├── hooks/                 # Custom hooks
│   ├── types/                 # TypeScript definitions
│   └── App.tsx               # Main application
├── dist/
│   └── client/               # Built static assets
└── package.json
```

## Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js HTTP server with static file serving
- **CLI**: Validates export files and starts embedded server
- **Data**: Streams JSON files via `/data/` endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
