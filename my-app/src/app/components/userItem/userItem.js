export const UserItem = ({ data }) => {
    return (
        <>
            <p>name: {data.name}</p>
            <p>id: {data.id}</p>
            <p>_id: {data._id}</p>
            <p>image: {data.image}</p>
            <p>email: {data.email}</p>
            <p>role: {data.role}</p>
            <p>-----------------------------</p>
        </>
    )
}