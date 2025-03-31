import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

export const keysDefault = [
    'createdAt',
    'updatedAt',
    'id'
]
const statusOfLearningItem = [
    {
        name: 'draft',
        lvl: 0
    },
    {
        name: 'released',
        lvl: 1
    }
]
export const learningItemConfig = {
    title: {
        title: 'Title',
        // valueType: 'String',
        editType: 'text',
        default: '',
        required: true,
    },
    status: {
        title: 'Status',
        editType: 'radioBox',
        default: 'draft',
        required: true,
        options: statusOfLearningItem
    },
    content: {
        title: 'Content',
        // valueType: 'String',
        editType: 'richText',
        default: '',
        required: true,
    },
    authorInfo: {
        // valueType: 'String',
        // editType: 'readOnly',
        default: undefined
    },
    tags: {
        // valueType: 'String', // wtest
        // editType: 'checkBox', // wtest
        default: undefined
    },
    // createdAt: {
    //     // valueType: 'Date',
    //     default: undefined
    // },
    // updatedAt: {
    //     // valueType: 'Date',
    //     default: undefined
    // },
    // id: {
    //     // valueType: 'String',
    //     default: undefined
    // }
}

export const learningItemValidation = zod.object({
    // title: zod.string().min(1, 'Title is required'),
    title: zod.string().min(1, { message: 'Title is required' }),
    content: zod.string().min(1, { message: 'Content is required' }),
    status: zod.enum(['draft', 'released']),
    // authorInfo: zod.object() // wtest waiting
    // tags: zod.array(string).optional() // wtest waiting

});
const userRoleOptions = [
    {
        name: 'viewer',
        lvl: 0
    },
    {
        name: 'editor',
        lvl: 1,
    },
    {
        name: 'admin',
        lvl: 2,
    },
    {
        name: 'owner',
        lvl: 3
    },
    {
        name: 'mainAdmin',
        lvl: 999
    }
]
export const userItemConfig = {
    name: {
        title: 'Name',
        // valueType: 'String',
        editType: 'text',
        default: '',
        required: true
    },
    email: {
        title: 'Email',
        // valueType: 'String',
        editType: 'readOnly',
        default: '',
        required: true
    },
    userId: {
        title: 'Name',
        // valueType: 'String',
        // editType: 'text',
        default: '',
        required: true
    },
    image: {
        title: 'Name',
        // valueType: 'String',
        // editType: 'text',
        default: '',
        required: true
    },
    role: {
        title: 'Role',
        // valueType: 'String',
        editType: 'radioBox',
        // editType: 'text', // wtest
        default: '',
        required: true,
        options: userRoleOptions
    },
    // authorId: {
    //     title: 'authorId',
    //     // valueType: 'String',
    //     editType: 'readOnly',
    //     default: '',
    //     required: true
    // },
    editorId: {
        title: 'ediorId',
        // valueType: 'String',
        editType: 'readOnly',
        default: '',
        required: true
    }
}
export const userItemValidation = zod.object({
    // title: zod.string().min(1, 'Title is required'),
    name: zod.string().min(1, {
        message: 'Name is required 1',
        required_error: 'Name is required 2',
        invalid_type_error: 'wtest type' }),
    email: zod.string().email().min({required_error: 'email is required'}), // wtest
    // userId: zod.string().min(1, { required_error: 'userId is required' }), // wtest
    image: zod.string().refine(
        value => value.startsWith('https://') || value.startsWith('http://'),
        {message: '图片 URL 必须以 http:// 或 https:// 开头'}
    ), // wtest
    role: zod.enum(['viewer', 'editor', 'admin', 'owner', 'mainAdmin']),
    editorId: zod.string().optional(), // wtest

});

const groupOptions = [
    {
        name: 'management',
        lvl: 0
    },
    {
        name: 'learning',
        lvl: 1,
    },
]
export const listNavItemConfig = {
    title: {
        title: 'Title',
        editType: 'text',
        default: '',
        required: true
    },
    link: {
        title: 'Link',
        editType: 'text',
        default: '/',
        required: true
    },
    colName: {
        title: 'ColName',
        editType: 'text', // wtest text
        default: '',
        required: true
    },
    groupName: {
        title: 'GroupName',
        editType: 'radioBox',
        default: 'management',
        // default: '',
        required: true,
        options: groupOptions
    },
    authorId: {
        title: 'authorId',
        // valueType: 'String',
        editType: 'readOnly',
        default: '',
        required: true
    }
}

export const listNavItemValidation = zod.object({
    title: zod.string().min(1, { message: 'Title is required' }),
    link: zod.string().min(1, { message: 'Link is required' }),
    colName: zod.string().min(1, { message: 'ColName is required' }),
    groupName: zod.string().min(1, { message: 'groupName is required' }),
});

export const commentItemConfig = {
    content: {
        // title: 'Content',
        editType: 'text',
        default: '',
        required: true
    },
    // belongToItemId: {

    // },
    // belongToItemCollection: {

    // },
    replyToCommentId: {
        default: ''
    }
    // authorId: {},
    // like: {},
    // favorite: {}
}
export const commentItemValidation = zod.object({
    content: zod.string().min(1, {message: 'content is required'}),
    belongToItemId: zod.string().min(1, {message: 'belongToItemId is required'}),
    belongToItemCollection: zod.string().min(1, {message: 'belongToItemCollection is required'}),
    replyToCommentId: zod.string().optional(),
    // aha: zod.string().min(1, {message: 'aha wtest'}),
    authorId: zod.string().min(1, {message: 'belongToItemCollection is required'}),
    like: zod.number().optional(),
    favorite: zod.number().optional()
})

export const introConfig = {
    content: {
        title: 'About Me',
        editType: 'richText',
        default: ''
    }
}
export const introValidation = zod.object({
    content: zod.string()
})



// createdAt: "2025-03-10T05:43:47.350Z"
// email: "323@qq.com"
// image: "https://lh3.googleusercontent.com/a/ACg8ocIjhCKEvHRTFNPuWEhoKJWg-6g4U4BaGSCwu5Zk11RaaTxCBvM=s96-c"
// isEditItem: false
// name: "Ryuuna R 323"
// role: "viewer"
// updatedAt: "2025-03-10T05:44:26.995Z"
// userId: "323"
// __v: 0
// _id: "67ce7c1316003e7c19ea0376"


// createdAt: "2025-03-10T05:43:47.350Z"
// editorId: // mainAdmin
// email: "323@qq.com"
// id: "67ce7c1316003e7c19ea0376"

// image: "https://lh3.googleusercontent.com/a/ACg8ocIjhCKEvHRTFNPuWEhoKJWg-6g4U4BaGSCwu5Zk11RaaTxCBvM=s96-c"
// name: "Ryuuna R 323"
// role: "admin"

// updatedAt: Thu Mar 13 2025 05:29:35 GMT+0800 (中国标准时间) {}
// userId: "323"


// createdAt: "2025-03-10T05:43:47.350Z"
// editorId: undefined
// email: "323@qq.com"
// id: "67ce7c1316003e7c19ea0376"
// image: "https://lh3.googleusercontent.com/a/ACg8ocIjhCKEvHRTFNPuWEhoKJWg-6g4U4BaGSCwu5Zk11RaaTxCBvM=s96-c"
// name: "Ryuuna R 323"
// role: "viewer"
// updatedAt: "2025-03-10T05:44:26.995Z"
// userId: "323"