export function dateToString(date: Date): string {
    const yyyy = date.getFullYear().toString().padStart(4, '0')
    const mm = (date.getMonth() + 1).toString().padStart(2, '0')
    const dd = date.getDate().toString().padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

export function dateToMonday(date: Date): Date {
    date.setDate(date.getDate() - date.getDay() + 1)
    return date
}

export function dayToDayname(day: number): string {
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][day]
}