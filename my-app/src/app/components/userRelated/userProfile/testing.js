'use client'
export const Testing = ({ testing }) => {
    console.log('testing', testing)
    return <p>testing, {JSON.stringify(testing)}</p>
}