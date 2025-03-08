export const timeFormatter = (time) => {
    // const timeOri = new Date(time)
    // const timeFormatted = timeOri.toLocaleString('zh-CN', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     hour: '2-digit',
    //     minite: '2-digit'
    // })

    const timeFormatted = time ? new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Shanghai", // 时区可改
      }).format(new Date(time)) : '?';

    return timeFormatted
}