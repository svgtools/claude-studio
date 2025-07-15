import React from 'react';
import type { Chat } from '../types/claude-export';
import { SidebarTrigger } from "@/components/ui/sidebar";

interface ChatHeaderProps {
    chat: Chat;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat }) => {
    return (
        <header className="bg-card border-b border-border h-12 flex items-center px-4 gap-3">
            <SidebarTrigger />
            <h1 className="text-base font-semibold text-card-foreground truncate">
                {chat.name || 'Untitled Chat'}
            </h1>
        </header>
    );
}; 