import { apiCall } from "./common"

interface SessionResponse {
    id: string
    name: string
}

export function sessionCreate(name: string): Promise<SessionResponse> {
    return apiCall<SessionResponse>('sessions', 'POST', {name: name}) satisfies Promise<SessionResponse>
}

export function sessionGet(id: string): Promise<SessionResponse> {
    return apiCall<SessionResponse>(`sessions/${id}`, 'GET') satisfies Promise<SessionResponse>
}

export function sessionUpdate(id: string, name?: string): Promise<SessionResponse> {
    const body = {
        name
    }
    return apiCall<SessionResponse>(`sessions/${id}`, 'PUT', body)
}