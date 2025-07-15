# Claude Studio

A local CLI tool that visualizes Claude AI data exports via a React UI.

## Installation

```bash
npm install -g claude-studio
```

## Usage

1. Export your Claude data from the Claude web app
2. Extract to a folder with:
   ```
   claude-export/
   ├── users.json
   ├── projects.json
   └── conversations.json
   ```
3. Run inside that folder:
   ```bash
   cd claude-export
   npx claude-studio
   ```

Opens `http://localhost:5173` with your conversations and data.

## Development

### Setup

```bash
git clone https://github.com/your-username/claude-studio.git
cd claude-studio
npm install
```

### Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### Local Testing

**Frontend development:**
```bash
npm run dev
```

**Full CLI testing:**
```bash
npm run build
cd mock
node ../bin/claude-studio.js
```

### Project Structure

```
claude-studio/
├── bin/claude-studio.js       # CLI entry point
├── src/                       # React app source
├── dist/client/              # Built static assets
└── mock/                     # Test data
```

## Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Node.js HTTP server serving static files
- **Data**: Streams JSON files via `/data/` endpoints
- **Offline**: No external network calls, data stays local

## License

MIT
