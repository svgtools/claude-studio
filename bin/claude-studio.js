#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import serveStatic from 'serve-static';
import finalhandler from 'finalhandler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REQUIRED_FILES = ['users.json', 'projects.json', 'conversations.json'];
const DEFAULT_PORT = 5173;

// Parse command line arguments
const args = process.argv.slice(2);
const shouldSkipBrowser = args.includes('--no-open') || args.includes('--skip-browser');

function validateExportFiles() {
    console.log('🔍 Validating Claude export files...');

    const missing = [];
    const invalid = [];

    for (const file of REQUIRED_FILES) {
        if (!fs.existsSync(file)) {
            missing.push(file);
            continue;
        }

        try {
            const content = fs.readFileSync(file, 'utf8');
            JSON.parse(content);
            console.log(`✅ ${file} - Valid`);
        } catch (error) {
            invalid.push({ file, error: error.message });
        }
    }

    if (missing.length > 0) {
        console.error('\n❌ Missing required files:');
        missing.forEach(file => console.error(`   - ${file}`));
        console.error('\nPlease ensure you have all three Claude export files in the current directory.');
        process.exit(1);
    }

    if (invalid.length > 0) {
        console.error('\n❌ Invalid JSON files:');
        invalid.forEach(({ file, error }) => console.error(`   - ${file}: ${error}`));
        process.exit(1);
    }

    console.log('✅ All export files are valid!\n');
}

function findAvailablePort(startPort) {
    return new Promise((resolve) => {
        const server = http.createServer();
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on('error', () => {
            resolve(findAvailablePort(startPort + 1));
        });
    });
}

function createServer(port) {
    const distPath = path.join(__dirname, '..', 'dist', 'client');
    const serve = serveStatic(distPath, { index: ['index.html'] });

    const server = http.createServer((req, res) => {
        // Handle data endpoints
        if (req.url.startsWith('/data/')) {
            const filename = req.url.replace('/data/', '');
            if (REQUIRED_FILES.includes(filename)) {
                try {
                    const content = fs.readFileSync(filename, 'utf8');
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.end(content);
                    return;
                } catch (error) {
                    res.statusCode = 404;
                    res.end('File not found');
                    return;
                }
            }
        }

        // Serve static files
        serve(req, res, finalhandler(req, res));
    });

    server.listen(port, () => {
        console.log(`🚀 Claude Studio is running at http://localhost:${port}`);
        console.log('📁 Serving Claude export data from current directory');
        console.log('Press Ctrl+C to stop the server\n');

        // Auto-open browser (unless disabled)
        if (!shouldSkipBrowser) {
            const url = `http://localhost:${port}`;
            const platform = process.platform;
            let command, args;

            if (platform === 'darwin') {
                command = 'open';
                args = [url];
            } else if (platform === 'win32') {
                command = 'cmd';
                args = ['/c', 'start', url];
            } else {
                command = 'xdg-open';
                args = [url];
            }

            spawn(command, args, { stdio: 'ignore', detached: true }).unref();
        } else {
            console.log('🌐 Browser auto-open disabled. Visit the URL above manually.');
        }
    });

    return server;
}

async function main() {
    console.log('🧠 Claude Studio - Local Claude Export Viewer\n');

    // Check if we're in a directory with export files
    validateExportFiles();

    // Find available port
    const port = await findAvailablePort(DEFAULT_PORT);

    // Create and start server
    const server = createServer(port);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n👋 Shutting down Claude Studio...');
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });
}

main().catch(error => {
    console.error('❌ Error starting Claude Studio:', error.message);
    process.exit(1);
}); 