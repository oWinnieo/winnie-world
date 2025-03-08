"use client";
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { htmlEncode, htmlSimpleDecode } from '@/lib/utils';

import { TiptapEditor } from '@/app/components/richTextEditor/TiptapEditor' 
import './itemEditor.scss';

// type UserType = {
//     name: String;
//     email: String;
//     userId: String;
//     image: String;
// }
type FormAddItemParams = {
    urlDomainLearning: string;
    data: FormAddItemType,
    collectionName: string;
    // user: UserType;
    authorId: String;
}
type FormAddItemType = {
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    id?: string;
}

  const formSchema = zod.object({
    title: zod.string().min(2, '姓名至少需要 2 个字符'),
    content: zod.string().min(2, '请输入有效的邮箱地址'),
});

interface FormValues {
    content: string; // 确保 content 是一个字符串
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
    id?: string;
}
export const FormAddItem = ({ params }: {params: FormAddItemParams}) => {

    const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
        defaultValues: params.data ? {
            title: params.data.title,
            content: htmlSimpleDecode(params.data.content), // wtest description
            createdAt: params.data.createdAt,
            updatedAt: params.data.updatedAt,
            id: params.data.id
          } : {
            title: "",
            content: "", // wtest description
            createdAt: undefined,
            updatedAt: undefined,
            id: ""
          },
      });
    // 处理表单提交的函数
    const onSubmit: SubmitHandler<{
        title: string;
        content: string,
        updatedAt?: Date,
        createdAt?: Date,
        id?: string
     }> = async (data: FormAddItemType) => {
        // console.log('表单提交数据:', data);
        const { title, content } = data
        if (!title || !content) {
            alert('Title and content should not be empty!')
            return
        }
        const contentEncoded = htmlEncode(content)
        const newData: FormAddItemType = {
            ...data,
            content: contentEncoded,
            updatedAt: new Date(),
        };
        // 处理表单提交逻辑
        if (params.data) {
            console.log('newData', newData) // wtest
            console.log('params', params)
            // console.log('wtest aha', { ...newData, updatedAt: new Date(), authorId: params.authorId })
            try {
                console.log('wtest waiting ----------------------->')
                const res = await fetch(`${params.urlDomainLearning}?collectionName=${params.collectionName}`, {
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
                const res = await fetch(`${params.urlDomainLearning}?collectionName=${params.collectionName}`, {
                    method: 'POST',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify({ title, content, authorId: params.authorId }) // wtest user: params.user
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
    <form
        className="area-form flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}>
            {/* <p>wtest params.userId: {params.userId}</p> */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        <div className="area-form-item">
            {/* 标题输入框 */}
            <label className="block">
                <span className="text-lg font-medium">Title:</span>
                <input
                    type="text"
                    {...register("title", { required: true })}
                    className="mt-1 p-2 w-full border rounded"
                    placeholder="Enter title..."
                />
            </label>
            {/* <label htmlFor="title">姓名:</label> */}
            {/* <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                id="title"
                placeholder='Title'
                {...register('title')}
            /> */}
            {/* {errors.title && <p>{errors.title.message}</p>} */}
        </div>
        <div className="area-form-item">
            {/* <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Content1"
                onChange={e => setContent(e.target.value)}></input> */}
            {/* Tiptap 富文本编辑器 */}
            <label className="block">
            <span className="text-lg font-medium">Content:</span>
            <TiptapEditor
                value={watch("content")} // 监听内容变化
                // onChange={(value) => setValue("content", value)} // 更新表单的 content 字段
                onChange={(value: string) => setValue("content", value as string)} // wtest
            />
            </label>
        </div>
    </form>
  );
}
