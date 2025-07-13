import React from 'react';
import type { Conversation } from '../types/claude-export';
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
} from './ui/sidebar';

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
    return (
        <>
            <SidebarTrigger className="absolute left-4 top-4 md:hidden" />
            <Sidebar>
                <SidebarContent>
                    <SidebarMenu>
                        {conversations.map((conversation) => (
                            <SidebarMenuItem key={conversation.uuid}>
                                <SidebarMenuButton
                                    isActive={selectedConversationId === conversation.uuid}
                                    onClick={() => onConversationSelect(conversation.uuid)}
                                    className="w-full"
                                >
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-sidebar-foreground truncate">
                                            {conversation.name || 'Untitled Conversation'}
                                        </h3>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                        {conversations.length === 0 && (
                            <div className="p-4 text-center text-muted-foreground">
                                No conversations found
                            </div>
                        )}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </>
    );
}; 