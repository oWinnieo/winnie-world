/* listNav */
export type FormForListNavItemParams = {
    title: string;
    link: string;
    colName: string;
    groupName: string;
}
/* /listNav */

/* learning item */
export type FormForLearningItemType = {
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    id?: string;
}
/* /learning item */

/* form params */
export type FormForLearningItemParams = {
    urlDomain: string; // wtest 1
    collectionName: string; // wtest 1
    data?: any, // wtest backup FormForLearningItemType // wtest | FormForListNavItemParams, // wtest 1
    // user: UserType;
    authorId?: String; // wtest 1
    // formDataType?: any; // wtest
}
/* /form params */


// title: string;
// content: string,
// updatedAt?: Date,
// createdAt?: Date,
// id?: string

// type UserType = {
//     name: String;
//     email: String;
//     userId: String;
//     image: String;
// }



