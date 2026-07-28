import { apiCall } from "./common"

interface SessionCreate {
    id: string
    name: string
}

export async function sessionCreate(name: string): Promise<SessionCreate> {
    const response = await apiCall<SessionCreate>('sessions', 'POST', {name: name})
    return {
        id: response.id,
        name: response.name
    }
}
