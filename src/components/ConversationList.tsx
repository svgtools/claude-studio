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
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
                <p className="text-sm text-gray-500">{conversations.length} conversations</p>
            </div>

            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.uuid}
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConversationId === conversation.uuid ? 'bg-blue-50 border-blue-200' : ''
                            }`}
                        onClick={() => onConversationSelect(conversation.uuid)}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                    {conversation.name || 'Untitled Conversation'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {conversation.chat_messages.length} messages
                                </p>
                            </div>
                            <div className="text-xs text-gray-400 ml-2">
                                {formatDate(conversation.updated_at)}
                            </div>
                        </div>
                    </div>
                ))}

                {conversations.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                        No conversations found
                    </div>
                )}
            </div>
        </div>
    );
}; 