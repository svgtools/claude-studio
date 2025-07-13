import React from 'react';
import type { Conversation, ChatMessage } from '../types/claude-export';

interface MessageViewProps {
    conversation: Conversation | null;
}

export const MessageView: React.FC<MessageViewProps> = ({ conversation }) => {
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderMessage = (message: ChatMessage) => {
        const isHuman = message.sender === 'human';
        const content = message.content.map(c => c.text).join('') || message.text;

        return (
            <div
                key={message.uuid}
                className={`mb-6 flex ${isHuman ? 'justify-end' : 'justify-start'}`}
            >
                <div
                    className={`max-w-3xl rounded-lg p-4 ${isHuman
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                        }`}
                >
                    <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${isHuman
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                                }`}>
                                {isHuman ? 'H' : 'A'}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium">
                                    {isHuman ? 'Human' : 'Assistant'}
                                </span>
                                <span className={`text-xs ${isHuman ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                    {formatTime(message.created_at)}
                                </span>
                            </div>
                            <div className="text-sm whitespace-pre-wrap">
                                {content || <em className="text-gray-500">No content</em>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!conversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-gray-400 mb-2">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <p className="text-gray-500">Select a conversation to view messages</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <h1 className="text-xl font-semibold text-gray-900">
                    {conversation.name || 'Untitled Conversation'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {formatDate(conversation.created_at)} • {conversation.chat_messages.length} messages
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {conversation.chat_messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                        No messages in this conversation
                    </div>
                ) : (
                    conversation.chat_messages.map(renderMessage)
                )}
            </div>
        </div>
    );
}; 