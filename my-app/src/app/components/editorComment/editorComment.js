// export const EditorComment = () => {
//     return <p>EditorComment inside wtest_here_fetch -- 2</p>
// }
'use client'
import { useEffect, useState } from 'react';
import { commentItemConfig, commentItemValidation, abc_wtest, abv_wtest } from '@/constants/formConfig'
import { Text } from '@components/formElement/text'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import './editorComment.scss'
export const EditorComment = ({ itemId, itemColName, params, authorId, replyCommentInfo }) => { // wtest backup 
    // console.log('?? wtest', 'replyCommentInfo', replyCommentInfo)
    const [ replyComInfo, setReplyComInfo ] = useState(replyCommentInfo)
    const defaultValues = {
        content: '',
        belongToItemId: params.data.id,
        belongToItemCollection: params.collectionName,
        replyToCommentId: undefined, // wtest here why make an example to check
        authorId,
        like: 0,
        favorite: 0
    }
    
    
    console.log('defaultValues', defaultValues)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(commentItemValidation), // wtest commentItemValidation / abv_wtest
        defaultValues
    });
    const onSubmit = async (data) => {
        // console.log('onSubmit ? data', data, 'params', params)
        const dataUpdated = {
            ...data,
            replyToCommentId: replyComInfo?._id ? replyComInfo._id : undefined,
        }
        try {
            // console.log('wtest waiting -----------------------> add', data, 'dataUpdated', dataUpdated)
            
            // debugger;
            const res = await fetch(`${params.urlDomain}?collectionName=comment`, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({ ...dataUpdated }) // wtest user: params.user
            })
            // console.log('res', res)
            // debugger;
            const dataRes = await res.json();
            if (dataRes.success) {
                console.log(dataRes.message)
                window.location.reload()
            } else {
                throw new Error('Failed to create an item.')
            }
        } catch (err) {
            console.log(err)
        }
    }
    const configForComment_wtest = {

    }
    useEffect(() => {
        setReplyComInfo(replyCommentInfo)
    }, [replyCommentInfo])
    useEffect(() => {
        setReplyComInfo(replyCommentInfo)
    }, [])
    return <div className='comment-send'>
        <form
            className="area-form"
            onSubmit={handleSubmit(onSubmit)}>
            {/* <p>Editor Comment, {itemId}, {itemColName}, {authorId}</p> */}
            {/* {JSON.stringify(replyComInfo)} */}
            <div className="area-comment-enter">
                {replyComInfo?._id && <div className="area-reply">
                    <p>Reply to: {JSON.stringify(replyComInfo.content)}</p>
                    <button className="btn-reply-cancel" onClick={() => setReplyComInfo(null)}>&times;</button>
                </div>}
                <Text
                    config={commentItemConfig.content} // wtest commentItemConfig / abc_wtest
                    keyName='content'
                    value={watch('content')}
                    onChange={(value) => setValue('content', value)}
                    register={register}
                    errors={errors}>
                </Text>
                {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>
            
            
            <button
                type="submit"
                className="btn-submit bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                Submit
            </button>
        </form>    
        </div>
    
}