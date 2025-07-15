import React from 'react';
import type { Conversation } from '../types/claude-export';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

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
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Conversations</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {conversations.map((conversation) => (
                                <SidebarMenuItem key={conversation.uuid}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={selectedConversationId === conversation.uuid}
                                    >
                                        <button
                                            className="w-full text-left truncate"
                                            onClick={() => onConversationSelect(conversation.uuid)}
                                        >
                                            {conversation.name || 'Untitled Conversation'}
                                        </button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {conversations.length === 0 && (
                                <SidebarMenuItem>
                                    <div className="px-2 py-3 text-center text-muted-foreground">
                                        No conversations found
                                    </div>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}; 