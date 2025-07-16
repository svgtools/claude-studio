import React from 'react';
import { marked } from 'marked';
import type { ChatMessage } from '../types/claude-export';

interface MessageProps {
    message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    const isHuman = message.sender === 'human';
    const content = message.content.map(c => c.text).join('') || message.text;

    // Parse markdown content to HTML
    const htmlContent = content ? marked.parse(content) : '';

    return (
        <div
            key={message.uuid}
            className="mb-6 flex justify-center"
        >
            <div className="max-w-4xl w-full">
                {isHuman ? (
                    <div className="bg-card border border-border text-card-foreground rounded-lg p-4">
                        {content ? (
                            <div
                                className="prose prose-invert prose-slate max-w-none prose-headings:text-foreground prose-p:text-card-foreground prose-a:text-blue-400 prose-strong:text-foreground prose-code:text-slate-400 prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-border prose-blockquote:text-muted-foreground prose-li:text-card-foreground"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        ) : (
                            <em className="text-muted-foreground">No content</em>
                        )}
                    </div>
                ) : (
                    <div className="w-full">
                        {content ? (
                            <div
                                className="prose prose-invert prose-slate max-w-none prose-headings:text-foreground prose-p:text-foreground prose-a:text-blue-400 prose-strong:text-foreground prose-code:text-slate-400 prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-border prose-blockquote:text-muted-foreground prose-li:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        ) : (
                            <em className="text-muted-foreground">No content</em>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}; 