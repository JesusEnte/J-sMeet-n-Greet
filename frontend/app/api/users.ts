import { apiCall, getApiCache, setApiCache, invalidateApiCache } from "./common"

interface UserResponse {
    id: string
    name: string
}

export function usersGet(session_id: string): Promise<UserResponse[]> {
    const cached = getApiCache(`${session_id}/users`)
    if (cached != undefined) {
        return cached
    } else {
        const response = apiCall<UserResponse[]>(`${session_id}/users`, 'GET') satisfies Promise<UserResponse[]>
        setApiCache(`${session_id}/users`, response)
        return response
    }
}

export function userCreate(session_id: string, name: string): Promise<UserResponse> {
    return apiCall<UserResponse>(`${session_id}/users`, 'POST', {name: name}) satisfies Promise<UserResponse>
}

export function userRemove(session_id: string, id: string): Promise<string> {
    invalidateApiCache(`${session_id}/users`)
    invalidateApiCache(`${session_id}/users/${id}`)
    return apiCall<string>(`${session_id}/users/${id}`, 'DELETE') satisfies Promise<string>
}