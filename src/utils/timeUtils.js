export const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export function convertToAMPM(time24) {
    // Split the input time into hours and minutes
    const [hours, minutes] = time24.split(':').map(Number);

    // Determine whether it's AM or PM
    const period = hours < 12 ? 'AM' : 'PM';

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Create the AM/PM time string
    const time12 = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;

    return time12;
}

export function isTimeBetween(openTime, closeTime) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const [startHour, startMinute] = openTime.split(':')
    const [endHour, endMinute] = closeTime.split(':')
    if (
        (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
        (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
    ) {
        return true;
    }

    return false;
}

export function dateFormatterDDMM(seconds) {
    const formatter = Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    return formatter.format(new Date(seconds * 1000));
}
