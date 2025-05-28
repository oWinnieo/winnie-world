// export const FormForLearningItem = () => {
//     return <p>FormForLearningItem inside wtest_here_fetch -- a1</p>
// }
"use client";
import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
/* wtest */
import { Text } from '@components/formElement/text';
import { CheckBox } from '@components/formElement/checkBox'
import { RadioBox } from '@components/formElement/radioBox'
import { TextReadOnly } from '@components/formElement/textReadOnly';
/* /wtest */
import { useForm, SubmitHandler } from "react-hook-form";
import { htmlEncode, htmlSimpleDecode } from '@/lib/utils';
import { FormForLearningItemParams, FormForLearningItemType, FormLearningItemValues } from '@/types/formTypes';
import { learningItemValidation, listNavItemValidation, userItemValidation, keysDefault, introValidation } from '@/constants/formConfig'
import { collectionNameForManagement } from '@/constants/collectionName'
import { TiptapEditor } from '@/app/components/richTextEditor/TiptapEditor'
/* wtest redux */
import { RecentNote } from '@components/recentNote/recentNote'
import { NoteCard } from '@components/forTesting/notecard'
/* /wtest redux */
/* wtest update recentnode */
import { usePathname } from "next/navigation"
import { useDispatch } from 'react-redux';
import { updateEditPost, clearEditPost } from '@/../store/editPostCacheSlice';
import { AppDispatch } from '@/../store';


/* /wtest update recentnode */
/* wtest update recentnode */
const note = {
    id: 'abc123',
    title: '学习 Redux',
    body: 'Redux 是一个状态管理库...',
  };
  /* /wtest update recentnode */
import './itemEditor.scss';


const validationGroupCheck = ({ collectionName }) => {
    if (collectionNameForManagement.includes(collectionName)) {
        switch (collectionName) {
            case 'listNav':
                return listNavItemValidation
            case 'user':
                return userItemValidation
            case 'intro':
                return introValidation
        }
    } else {
        return learningItemValidation
    }
}

export const FormForLearningItem = ({ params }) => {
    const [ isJustOpen, setIsJustOpen ] = useState(true)
    const pathName = usePathname()
    const formConfigKeysArr = Object.keys(params.formConfig).concat(keysDefault)
    const keysForDisplayArr = formConfigKeysArr.filter(key => params.formConfig[key]?.editType) // wtest
    const keysForRichTextArr = formConfigKeysArr.filter(key => params.formConfig[key]?.editType === 'richText')

    const defaultValues = {}
    const defaultValueSetWithData = (key) => {
        if (key === 'id') {
            return params.data._id || params.data.id
        } else {
            return params.formConfig?.[key]?.editType === 'richText' ? htmlSimpleDecode(params.data[key]) : params.data[key]
        }
    }
    formConfigKeysArr.forEach(key => {
        defaultValues[key] = params?.data ?
            (defaultValueSetWithData(key)) :
            (params.formConfig[key]?.default ? params.formConfig[key]?.default : undefined)
    })
    const validationObj = validationGroupCheck({ collectionName: params.collectionName })
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(validationObj),
        defaultValues
    });
    
    // 处理表单提交的函数
    const onSubmit = async (data) => {
        const dataForUpdate = {
            ...defaultValues,
            ...data
        }
        
        const newData = {
            ...dataForUpdate,
            updatedAt: new Date(),
        };
        if (params.group === 'management' && (params.collectionName === 'user' || params.collectionName === 'intro')) {
            newData.editorId = params.authorId
        }
        keysForRichTextArr.forEach(key => {
            newData[key] = htmlEncode(newData[key])
        })
        // 处理表单提交逻辑
        if (params.data && JSON.stringify(params.data) !== '{}' && params.data._id) {
            try {
                const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
                    method: 'PUT',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({ ...newData, updatedAt: new Date(), authorId: params.authorId })
                })
                const dataRes = await res.json();
                if (dataRes.success) {
                    window.location.reload()
                } else {
                    throw new Error('Failed to edit an item.')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
                    method: 'POST',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({ ...dataForUpdate, authorId: params.authorId }) // wtest user: params.user
                })
                const dataRes = await res.json();
                if (dataRes.success) {
                    window.location.reload()
                } else {
                    throw new Error('Failed to create an item.')
                }
            } catch (err) {
                console.log(err)
            }
        }
            
    };
    
    const dispatch = useDispatch();
    const handleValue = (data) => {
        if (params.group === 'learning' && !isJustOpen) {
            console.log('表单内容发生变化:', data);
            const { title, status, content } = data
            if (title !== '' || content !== '') {
                dispatch(updateEditPost({ title, content, pathName, 'ahaha': 'wtestahaha' }));
            } else {
                dispatch(clearEditPost());
            }
        }
    };
    watch(handleValue);
    useEffect(() => {
        console.log('setIsJustOpen just enter =--???', isJustOpen)
        setIsJustOpen(false)
    }, [])

  return (
    <>
    <form
        className="area-form flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="area-form-tools">
            <button
                type="submit"
                className="btn-submit bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                Submit
            </button>
        </div>
        {
            keysForDisplayArr.map(key => (
                <div key={key} className="area-form-item">
                    {(() => {
                        switch (params.formConfig[key].editType) {
                            case 'text':
                                return (<Text
                                    config={params.formConfig[key]}
                                    keyName={key}
                                    value={watch(key)}
                                    onChange={(value) => setValue(key, value)}
                                    register={register}
                                    errors={errors}>
                                </Text>);
                            case 'richText':
                                /* Tiptap 富文本编辑器 */
                                return (<TiptapEditor
                                    config={params.formConfig[key]}
                                    keyName={key}
                                    value={watch(key)} // 监听内容变化
                                    onChange={(value) => setValue(key, value)} // 更新表单的 content 字段
                                    register={register}
                                    errors={errors}
                                />);
                            // case 'checkBox': wtest waiting
                            //     return (<CheckBox></CheckBox>)
                            case 'radioBox':
                                return <RadioBox
                                    config={params.formConfig[key]}
                                    keyName={key}
                                    value={watch(key)}
                                    onChange={(value) => setValue(key, value)}
                                ></RadioBox>
                            default:
                                return (
                                <>
                                    <TextReadOnly
                                        config={params.formConfig[key]}
                                        keyName={key}
                                        value={watch(key)} // 监听内容变化
                                    ></TextReadOnly>
                                </>
                                )
                        }
                    })()}
                    {errors[key] && <p className="text-red-500">{errors[key].message}</p>}
                </div>
            ))
        }
    </form>
    </>
  );
}



