// export const FormForLearningItem = () => {
//     return <p>FormForLearningItem inside wtest_here_fetch -- a1</p>
// }
"use client";
import { useState } from 'react'
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
import { learningItemValidation, listNavItemValidation, userItemValidation, keysDefault } from '@/constants/formConfig'
import { collectionNameForLearning, collectionNameManagement } from '@/constants/collectionName'
import { TiptapEditor } from '@/app/components/richTextEditor/TiptapEditor'
import './itemEditor.scss';


const validationGroupCheck = ({ collectionName }) => {
    if (collectionNameForLearning.includes(collectionName)) {
        return learningItemValidation
    } else if (collectionNameManagement.includes(collectionName)) {
        console.log('collectionName', collectionName)
        switch (collectionName) {
            case 'listNav':
                return listNavItemValidation
            case 'user':
                return userItemValidation
        }
    } else {
        return 'wtest waiting' // wtest
    }
}

export const FormForLearningItem = ({ params }) => {
    // console.log('wtest -------> params.data', params.data)
    const formConfigKeysArr = Object.keys(params.formConfig).concat(keysDefault)
    // console.log('formConfigKeysArr', formConfigKeysArr)
    // console.log('params.formConfig', params.formConfig)
    const keysForDisplayArr = formConfigKeysArr.filter(key => params.formConfig[key]?.editType) // wtest
    const keysForRichTextArr = formConfigKeysArr.filter(key => params.formConfig[key]?.editType === 'richText')

    const defaultValues = {}
    const defaultValueSetWithData = (key) => {
        console.log('key ---------------------------->', key)
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
    console.log('defaultValues', defaultValues)
    const validationObj = validationGroupCheck({ collectionName: params.collectionName })
    console.log('validationObj', validationObj)
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
        // console.log('onSubmit ? data', data, 'params.group')
        // console.log('params.group', params.group)
        // console.log('params.collectionName', params.collectionName)
        // console.log('params.authorId', params.authorId)
        const dataForUpdate = {
            ...defaultValues,
            ...data
        }
        console.log('表单提交数据:', dataForUpdate);
        const newData = {
            ...dataForUpdate,
            updatedAt: new Date(),
        };
        if (params.group === 'management' && params.collectionName === 'user') {
            newData.editorId = params.authorId
        }
        console.log('newData 1', newData) // wtest
        console.log('dataForUpdate', dataForUpdate)
        keysForRichTextArr.forEach(key => {
            newData[key] = htmlEncode(newData[key])
        })
        // console.log('params --->>> js', params, params)
        console.log('formConfig', params.formConfig)
        // console.log('defaultValues', defaultValues)
        console.log('newData 2', newData) // wtest
            // debugger;
        // 处理表单提交逻辑
        if (params.data) {
            try {
                console.log('wtest waiting -----------------------> update', newData)
                /* wtest here */
                // wtest ok authorId: "" 因为user是来自谷歌, 查看listNav是否authorId有值, 有,因为是站内创建的
                // wtest ok 已添加editorId, 接着需要确定为什么valid有问题, 因为valid必须要覆盖到才会更新值
                // wtest mac键盘怎么输入大于号
                // wtest http://localhost:3000/management/undefined?collectionName=user
                // wtest 为啥一直在转? https://lh3.googleusercontent.com/a/ACg8ocIjhCKEvHRTFNPuWEhoKJWg-6g4U4BaGSCwu5Zk11RaaTxCBvM=s96-c
                /* /wtest here */
                // console.log('params.urlDomain', params.urlDomain)
                // debugger;
                const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
                    method: 'PUT',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({ ...newData, updatedAt: new Date(), authorId: params.authorId })
                })
                const dataRes = await res.json();
                if (dataRes.success) {
                    console.log(dataRes.message)
                    window.location.reload()
                } else {
                    throw new Error('Failed to edit an item.')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                console.log('wtest waiting -----------------------> add', newData)
                // const wtest_d = { ...dataForUpdate, authorId: params.authorId }
                // console.log('wtest_d', wtest_d)
                debugger;
                const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
                    method: 'POST',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({ ...dataForUpdate, authorId: params.authorId }) // wtest user: params.user
                })
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
            
    };

  return (
    // <Form {...form}>
    /* wtest backup */
    <form
        className="area-form flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}>
            {/* <p>wtest params.userId: {params.userId}</p> */}
        <div className="area-form-tools">
            <button
                type="submit"
                className="btn-submit bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                Submit
            </button>
        </div>
        {/* <p>wtest default ({key}): {JSON.stringify(defaultValues[key])}</p> */}
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
                                // return <p>wtest default: {key}, {'11' + JSON.stringify(defaultValues[key])}, {'2' + JSON.stringify(params.data[key])}</p>
                        }
                    })()}
                    {errors[key] && <p className="text-red-500">{errors[key].message}</p>}
                </div>
            ))
        }
    </form>
    /* /wtest backup */
  );
}


