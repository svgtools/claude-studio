import React from 'react';
import type { Conversation, ChatMessage } from '../types/claude-export';

interface MessageViewProps {
    conversation: Conversation | null;
}

export const MessageView: React.FC<MessageViewProps> = ({ conversation }) => {
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

    if (!conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="text-muted-foreground mb-2">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <p className="text-muted-foreground">Select a conversation to view messages</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-background">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {conversation.chat_messages.length === 0 ? (
                    <div className="text-center text-muted-foreground mt-8">
                        No messages in this conversation
                    </div>
                ) : (
                    conversation.chat_messages.map(renderMessage)
                )}
            </div>
        </div>
    );
}; 