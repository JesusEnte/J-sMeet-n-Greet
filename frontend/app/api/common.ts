//promise cache for use hook using method and path as key
const promiseCache = new Map<string, Promise<any>>()

export function apiCall<R>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any
): Promise<R> {
    const promise = fetch(`api/${path}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && {body: JSON.stringify(body)})
    })
    .then( response => response.json())
    
    return promise satisfies Promise<R>
}

//invalidates either a specific resource or the entire cache if no key is given
export function setApiCache(key: string, promise: Promise<any>){
    promiseCache.set(key, promise)
}

export function getApiCache(key: string): Promise<any> | undefined {
    return promiseCache.get(key)
}

export function invalidateApiCache(key?: string){
    if (key && promiseCache.has(key)) {
        promiseCache.delete(key)
    } else {
        promiseCache.clear()
    }
}