export function getDateDDMM(inpDate: Date | number | string) {
    if (!inpDate) return;
    let date = inpDate instanceof Date ? inpDate : new Date(inpDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day} - ${month < 10 ? '0' + month : month} - ${year}`
}

export function getTimeToDate(inpDate: Date | number | string) {
    if (!inpDate) return;
    let date = inpDate instanceof Date ? inpDate : new Date(inpDate);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${(minute + '').length != 2 ? '0' + minute : minute}`;
}