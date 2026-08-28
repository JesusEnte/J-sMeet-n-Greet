export function dateToShortISO(date: Date): string {
    return date.toISOString().split('T', 1)[0]
}

export function dateToMonday(date: Date): Date {
    date.setDate(date.getDate() - date.getDay() + 1)
    return date
}

export function dayToDayname(day: number): string {
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][day]
}