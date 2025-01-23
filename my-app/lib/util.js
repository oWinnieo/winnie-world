export const timeFormatter = (time) => {
    const timeOri = new Date(time)
    const timeFormatted = timeOri.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minite: '2-digit'
    })
    return timeFormatted
}