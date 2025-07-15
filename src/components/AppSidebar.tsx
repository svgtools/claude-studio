import React from 'react';
import type { Conversation } from '../types/claude-export';
import { cn } from "@/lib/utils";

interface AppSidebarProps {
    conversations: Conversation[];
    selectedConversationId: string | null;
    onConversationSelect: (conversationId: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
    conversations,
    selectedConversationId,
    onConversationSelect,
}) => {
    return (
        <div className="overflow-y-auto bg-sidebar text-sidebar-foreground">
            <ul className="divide-y divide-border">
                {conversations.map((conversation) => (
                    <li key={conversation.uuid}>
                        <button
                            className={cn(
                                'w-full text-left px-4 py-3 text-sm truncate transition-colors',
                                selectedConversationId === conversation.uuid
                                    ? 'bg-muted text-foreground'
                                    : 'hover:bg-muted/60'
                            )}
                            onClick={() => onConversationSelect(conversation.uuid)}
                        >
                            {conversation.name || 'Untitled Conversation'}
                        </button>
                    </li>
                ))}

                {conversations.length === 0 && (
                    <li className="p-4 text-center text-muted-foreground">
                        No conversations found
                    </li>
                )}
            </ul>
        </div>
    );
}; 