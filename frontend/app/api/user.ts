import { apiCall } from "./common";

interface UserResponse {
    id: string
    name: string
}

export function usersGet(session_id: string): Promise<UserResponse[]> {
    return apiCall<UserResponse[]>(`${session_id}/users`, 'GET') satisfies Promise<UserResponse[]>
}

export function userCreate(session_id: string, name: string): Promise<UserResponse> {
    return apiCall<UserResponse>(`${session_id}/users`, 'POST', {name: name}) satisfies Promise<UserResponse>
}

export function userRemove(session_id: string, id: string): Promise<string> {
    return apiCall<string>(`${session_id}/users/${id}`, 'DELETE') satisfies Promise<string>
}