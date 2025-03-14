import { TiptapEditor } from '@/app/components/richTextEditor/TiptapEditor'
export const RichText = ({ config, keyName, value, onChange, register, errors }) => {
    return (
        <>
            <label className="block">
                <span className="text-lg font-medium">{config.title}:</span>
                <TiptapEditor
                    value={watch(keyName)} // 监听内容变化
                    onChange={(value) => setValue(keyName, value)} // 更新表单的 content 字段
                />
            </label>
            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </>
    )
}