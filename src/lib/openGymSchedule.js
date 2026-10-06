import { JAM_TIME_ZONE, jamTime } from './jamEvents.js';

const dateParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: JAM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
});

function parts(value) {
    return Object.fromEntries(
        dateParts.formatToParts(new Date(value)).map(({ type, value }) => [type, value])
    );
}

function midnight(date) {
    const target = Date.parse(`${date}T00:00:00Z`);
    let instant = target;
    // Resolve local midnight without assuming a 24-hour day at DST boundaries.
    for (let attempt = 0; attempt < 3; attempt++) {
        const p = parts(instant);
        const local = Date.parse(
            `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}Z`
        );
        instant += target - local;
    }
    return new Date(instant).toISOString();
}

export function openGymDays(now = new Date(), count = 2, offset = 0) {
    const p = parts(now);
    const today = Date.parse(`${p.year}-${p.month}-${p.day}T00:00:00Z`);
    const dates = Array.from({ length: count + 1 }, (_, index) =>
        new Date(today + (index + offset) * 86400000).toISOString().slice(0, 10)
    );
    return dates.slice(0, count).map((date, index) => ({
        date,
        start: midnight(date),
        end: midnight(dates[index + 1]),
        events: []
    }));
}

export function groupOpenGyms(items, days) {
    return days.map((day) => {
        const dayStart = Date.parse(day.start);
        const dayEnd = Date.parse(day.end);
        const events = items
            .flatMap((item) => {
                const rawStart = item.start?.dateTime || item.start?.date;
                if (
                    item.status === 'cancelled' ||
                    !item.id ||
                    !rawStart ||
                    Number.isNaN(Date.parse(rawStart))
                )
                    return [];
                const allDay = Boolean(item.start.date);
                const rawEnd = item.end?.dateTime || item.end?.date;
                const start = Date.parse(allDay ? midnight(rawStart) : rawStart);
                const end =
                    rawEnd && !Number.isNaN(Date.parse(rawEnd))
                        ? Date.parse(allDay ? midnight(rawEnd) : rawEnd)
                        : null;
                if (end !== null && end <= start) return [];
                if (start >= dayEnd || (end === null ? start < dayStart : end <= dayStart))
                    return [];
                return [
                    {
                        id: item.id,
                        title: item.summary?.trim() || 'Open gym',
                        location: item.location?.trim() || '',
                        calendarUrl: /^https:\/\//.test(item.htmlLink || '') ? item.htmlLink : null,
                        allDay,
                        start: new Date(Math.max(start, dayStart)).toISOString(),
                        end: end === null ? null : new Date(Math.min(end, dayEnd)).toISOString(),
                        dayEnd: day.end
                    }
                ];
            })
            .sort(
                (a, b) =>
                    Date.parse(a.start) - Date.parse(b.start) || a.title.localeCompare(b.title)
            );
        return { ...day, events };
    });
}

export function openGymTime(event, language = 'nl') {
    const time = jamTime(event, language);
    return event.end === event.dayEnd ? time.replace(/00:00$/, '24:00') : time;
}
