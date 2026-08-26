import { apiCall } from "./common";

interface UserResponse {
    id: string
    name: string
}

export function usersGet(session_id: string): Promise<UserResponse[]> {
    return apiCall<UserResponse[]>(`${session_id}/users`, 'GET') satisfies Promise<UserResponse[]>
}