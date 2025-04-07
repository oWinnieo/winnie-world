import { headers } from "next/headers"; // wtest path
const getUrl = async () => {
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = headersList.get('x-forwarded-proto') || 'http'
    const fullUrl = `${protocol}://${host}`
    const pathname = headersList.get("x-next-url") || "/";
    return {
        url: fullUrl,
        path: pathname
    }
}

export {
    getUrl
}
    