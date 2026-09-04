import { apiCall, getApiCache, setApiCache, invalidateApiCache } from "./common"

interface UserResponse {
    id: string
    name: string
}

export function usersGet(session_id: string): Promise<UserResponse[]> {
    const path = `${session_id}/users`
    const cached = getApiCache(path)
    if (cached != undefined) {
        return cached
    } else {
        const response = apiCall<UserResponse[]>(path, 'GET') satisfies Promise<UserResponse[]>
        setApiCache(path, response)
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