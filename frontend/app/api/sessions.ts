import { apiCall, getApiCache, setApiCache, invalidateApiCache } from "./common"

interface SessionResponse {
    id: string
    name: string
}

export function sessionCreate(name: string): Promise<SessionResponse> {
    return apiCall<SessionResponse>('sessions', 'POST', {name: name}) satisfies Promise<SessionResponse>
}

export function sessionGet(id: string): Promise<SessionResponse> {
    const path = `sessions/${id}`
    const cached = getApiCache(path)
    if (cached != undefined) {
        return cached
    } else {
        const response = apiCall<SessionResponse>(path, 'GET') satisfies Promise<SessionResponse>
        setApiCache(path, response)
        return response
    }
    
}

export function sessionUpdate(id: string, name?: string): Promise<SessionResponse> {
    const path = `sessions/${id}`
    invalidateApiCache(path)
    const body = {
        name
    }
    return apiCall<SessionResponse>(path, 'PUT', body)
}