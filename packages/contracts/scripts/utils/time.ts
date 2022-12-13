export const getEpochOfLastHour = () => {
    const now = Date.now()
    const nowInHours = now / 1000 / 60 / 60
    const epochOfLastHour = Math.floor(nowInHours) * 60 * 60 // in seconds

    return epochOfLastHour
}
