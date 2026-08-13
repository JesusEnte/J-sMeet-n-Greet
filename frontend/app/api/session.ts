import { apiCall } from "./common"

interface SessionResponse {
    id: string
    name: string
}

export async function sessionCreate(name: string): Promise<SessionResponse> {
    const response = await apiCall<SessionResponse>('sessions', 'POST', {name: name})
    return {
        id: response.id,
        name: response.name
    }
}

export async function sessionGet(id: string): Promise<SessionResponse> {
    const response = await apiCall<SessionResponse>(`sessions/${id}`, 'GET')
    console.log(response)
    return {
        id: response.id,
        name:response.name
    }
}