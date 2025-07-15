import React from 'react';
import type { Chat, ChatMessage } from '../types/claude-export';
import { MessageSquareDashed } from 'lucide-react';

interface MessageViewProps {
    chat: Chat | null;
}

export const MessageView: React.FC<MessageViewProps> = ({ chat }) => {
    const renderMessage = (message: ChatMessage) => {
        const isHuman = message.sender === 'human';
        const content = message.content.map(c => c.text).join('') || message.text;

        return (
            <div
                key={message.uuid}
                className="mb-6 flex justify-center"
            >
                <div className="max-w-4xl w-full">
                    {isHuman ? (
                        <div className="bg-card border border-border text-card-foreground rounded-lg p-4">
                            <div className="text-sm whitespace-pre-wrap">
                                {content || <em className="text-muted-foreground">No content</em>}
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm whitespace-pre-wrap text-foreground">
                            {content || <em className="text-muted-foreground">No content</em>}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (!chat) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="text-muted-foreground mb-2">
                        <span className="flex justify-center">
                            <MessageSquareDashed className="w-16 h-16 mx-auto text-muted-foreground" />
                        </span>
                    </div>
                    <p className="text-muted-foreground">Select a chat to view messages</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-background">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {chat.chat_messages.length === 0 ? (
                    <div className="text-center text-muted-foreground mt-8">
                        No messages in this chat
                    </div>
                ) : (
                    chat.chat_messages.map(renderMessage)
                )}
            </div>
        </div>
    );
}; 