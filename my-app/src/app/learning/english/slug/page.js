export default async function Slug ({ params }) {
    const { a } = await params
    return (
        // <h1>Post of English Learning: {params.id}</h1>
        <div>{JSON.stringify(a)}</div>
    )
}