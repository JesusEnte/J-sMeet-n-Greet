export function dateToShortISO(date: Date): string {
    return date.toISOString().split('T', 1)[0]
}

export function dateToMonday(date: Date): Date {
    date.setDate(date.getDate() - date.getDay() + 1)
    return date
}