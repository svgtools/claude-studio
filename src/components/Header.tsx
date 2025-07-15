import React from 'react';
import type { Conversation } from '../types/claude-export';

interface ConversationHeaderProps {
    conversation: Conversation;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation }) => {
    return (
        <header className="bg-card border-b border-border h-12 flex items-center px-4 gap-3">
            <h1 className="text-base font-semibold text-card-foreground truncate">
                {conversation.name || 'Untitled Conversation'}
            </h1>
        </header>
    );
}; 