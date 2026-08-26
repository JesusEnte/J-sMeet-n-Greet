//promise cache for use hook using method and path as key
const getPromiseCache = new Map<string, Promise<any>>()

export function apiCall<R>(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any
): Promise<R> {
    const cacheKey = `${method} ${path}`
    //check cache
    if (getPromiseCache.has(cacheKey)) {
        return getPromiseCache.get(cacheKey)! satisfies Promise<R>
    }

    //fetch otherwise
    const promise = fetch(`api/${path}`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && {body: JSON.stringify(body)})
    })
    .then( response => response.json())

    //update cache
    getPromiseCache.set(cacheKey, promise)
    
    //return
    return promise satisfies Promise<R>
}

//invalidates either a specific resource or the entire cache if no key is given
export function invalidateApiCache(key?: string){
    if (key && getPromiseCache.has(key)) {
        getPromiseCache.delete(key)
    } else {
        getPromiseCache.clear()
    }
}