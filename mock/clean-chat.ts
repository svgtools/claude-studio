// clean-chat.ts
import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Keep a ChatMessage only if every MessageContent.text is non‑empty.
 * If any MessageContent.text === "" (or whitespace), the message is removed.
 */
function isValidChatMessage(chatMessage: any): boolean {
    if (!Array.isArray(chatMessage?.content) || chatMessage.content.length === 0) {
        return false; // no content → drop
    }
    return chatMessage.content.every(
        (mc: any) => typeof mc?.text === 'string' && mc.text.trim().length > 0,
    );
}

async function main(): Promise<void> {
    const inputPath = process.argv[2] ?? 'input.json';
    const raw = await fs.readFile(inputPath, 'utf-8');
    const data = JSON.parse(raw);

    // Accept a single conversation object or an array of them
    const conversations: any[] = Array.isArray(data) ? data : [data];

    const cleanedConvos = conversations
        .map((conv) => {
            if (!Array.isArray(conv.chat_messages)) return null;

            // Remove chat messages that contain any empty MessageContent.text
            conv.chat_messages = conv.chat_messages.filter(isValidChatMessage);

            // Drop the conversation if no chat messages remain
            return conv.chat_messages.length > 0 ? conv : null;
        })
        .filter(Boolean);

    // Preserve original structure (single object vs. array)
    const cleaned = Array.isArray(data) ? cleanedConvos : cleanedConvos[0] ?? {};

    const { dir, name } = path.parse(inputPath);
    const outputPath = path.join(dir, `${name}.cleaned.json`);
    await fs.writeFile(outputPath, JSON.stringify(cleaned, null, 2), 'utf-8');
    console.log(`Cleaned JSON written to ${outputPath}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
