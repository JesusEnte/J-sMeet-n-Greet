import { dateToShortISO } from "~/utils/date"
import { apiCall, getApiCache, setApiCache, invalidateApiCache } from "./common"

interface RawDayResponse {
    date: string
    hours: string
}

interface DayResponse {
    date: Date
    hours: number //unsigned int whose first 24 bits will represent a boolish array (free/busy for each hour)
}

function rawDayToDay(raw: RawDayResponse): DayResponse {
    const day = {
        date: new Date(raw.date),
        hours: Number.parseInt(raw.hours, 16)
    }
    return day
}

export function dayGet(session_id: string, user_id: string | number, date: Date): Promise<DayResponse> {
    const path = `${session_id}/${user_id}/days/${dateToShortISO(date)}`
    const cached = getApiCache(path)
    if (cached != undefined) {
        return cached
    } else {
        return (async () => {
            const response = await apiCall<RawDayResponse>(path, 'GET')
            const dayResponse = Promise.resolve<DayResponse>(rawDayToDay(response))
            setApiCache(path, dayResponse)
            return dayResponse
        })()
    }
}

export function dayUpdate(session_id: string, user_id: string | number, date: Date, hours: number): Promise<DayResponse> {
    const path = `${session_id}/${user_id}/days/${dateToShortISO(date)}`
    invalidateApiCache(`${session_id}/all/days/${dateToShortISO(date)}`)
    
    const dayResponse = (async () => {
        const body = {
            hours: hours.toString(16).padStart(6, '0')
        }
        const response = await apiCall<RawDayResponse>(path, 'PUT', body)
        const dayResponse = Promise.resolve<DayResponse>(rawDayToDay(response))
        return dayResponse
    })()
    setApiCache(path, dayResponse)
    return dayResponse
}