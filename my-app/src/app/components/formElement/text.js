
export const Text = ({ config, keyName, value, onChange, register, className }) => {
    // console.log('config', config)
    return (
        <>
            {/* 标题输入框 */}
            <label className={'block ' + className}>
                {config.title && <span className="text-lg font-medium">{config.title}:</span>}
                <input
                    type="text"
                    id={keyName}
                    // {...register("title", { required: true })}
                    {...register(keyName)}
                    className="mt-1 p-2 w-full border rounded"
                    placeholder="Enter comment..."
                />
            </label>
        </>
    )
}