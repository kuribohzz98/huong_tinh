export function caculatorCost(timeIn: Date, timeOut: Date): number {
    let time = timeOut.getTime() - timeIn.getTime();
    if (time < 0) time = 0;
    const minute = Math.floor(time / (1000 * 60));
    if (minute <= 30) return 3000;
    if (minute <= 120) return Math.floor(minute * (5000 / 60));
    return Math.floor(minute * (3000 / 60));
}