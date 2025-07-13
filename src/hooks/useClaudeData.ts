import { useState, useEffect } from 'react';
import type { ClaudeExportData, User, Project, Conversation } from '../types/claude-export';

export const useClaudeData = () => {
    const [data, setData] = useState<ClaudeExportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [usersResponse, projectsResponse, conversationsResponse] = await Promise.all([
                    fetch('/data/users.json'),
                    fetch('/data/projects.json'),
                    fetch('/data/conversations.json')
                ]);

                if (!usersResponse.ok || !projectsResponse.ok || !conversationsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [users, projects, conversations] = await Promise.all([
                    usersResponse.json() as Promise<User[]>,
                    projectsResponse.json() as Promise<Project[]>,
                    conversationsResponse.json() as Promise<Conversation[]>
                ]);

                setData({
                    users,
                    projects,
                    conversations
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}; 