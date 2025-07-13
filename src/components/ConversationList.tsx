import React from 'react';
import type { Conversation } from '../types/claude-export';

interface ConversationListProps {
    conversations: Conversation[];
    selectedConversationId: string | null;
    onConversationSelect: (conversationId: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
    conversations,
    selectedConversationId,
    onConversationSelect
}) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-sidebar-border">
                <h2 className="text-lg font-semibold text-sidebar-foreground">Conversations</h2>
                <p className="text-sm text-muted-foreground">{conversations.length} conversations</p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.uuid}
                        className={`p-3 border-b border-sidebar-border cursor-pointer hover:bg-sidebar-accent ${selectedConversationId === conversation.uuid ? 'bg-sidebar-accent border-sidebar-primary' : ''
                            }`}
                        onClick={() => onConversationSelect(conversation.uuid)}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-sidebar-foreground truncate">
                                    {conversation.name || 'Untitled Conversation'}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {conversation.chat_messages.length} messages
                                </p>
                            </div>
                            <div className="text-xs text-muted-foreground ml-2">
                                {formatDate(conversation.updated_at)}
                            </div>
                        </div>
                    </div>
                ))}

                {conversations.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                        No conversations found
                    </div>
                )}
            </div>
        </div>
    );
}; 