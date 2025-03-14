export const TextReadOnly = ({ config, keyName, value}) => {
    return (
        <>
            <label className="block">
                <span className="text-lg font-medium">{config.title}:</span>
                <p>{JSON.stringify(value)}</p>
                {/* <input
                    type="text"
                    id={keyName}
                    // {...register("title", { required: true })}
                    {...register(keyName)}
                    className="mt-1 p-2 w-full border rounded"
                    placeholder="Enter title..."
                /> */}
            </label>
        </>
    )
}