import { apiCall, getApiCache, setApiCache, invalidateApiCache } from "./common"

interface SessionResponse {
    id: string
    name: string
}

export function sessionCreate(name: string): Promise<SessionResponse> {
    return apiCall<SessionResponse>('sessions', 'POST', {name: name}) satisfies Promise<SessionResponse>
}

export function sessionGet(id: string): Promise<SessionResponse> {
    const cached = getApiCache(`sessions/${id}`)
    if (cached != undefined) {
        return cached
    } else {
        const response = apiCall<SessionResponse>(`sessions/${id}`, 'GET') satisfies Promise<SessionResponse>
        setApiCache(`sessions/${id}`, response)
        return response
    }
    
}

export function sessionUpdate(id: string, name?: string): Promise<SessionResponse> {
    invalidateApiCache(`sessions/${id}`)
    const body = {
        name
    }
    return apiCall<SessionResponse>(`sessions/${id}`, 'PUT', body)
}