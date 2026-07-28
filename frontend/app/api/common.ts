export async function apiCall<T>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any
): Promise<T> {
    console.log(JSON.stringify(body))
    return fetch(`api/${path}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && {body: JSON.stringify(body)})
    })
    .then( response => response.json())
}