'use client'
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
import { ListLearningItem } from '@/app/components/list/listLearningItem/listLearningItem'
export const ListOfCollection = ({
    urlDomain,
    group,
    collectionName,
    learningItemConfig,
    listData,
    session
}) => { // wtest session here
    // console.log('group', group)
    // const ifManageButNotAdmin = () => {
    //     return group === 'management' &&
    //         (session.user?.role === 'mainAdmin' || !session.user)
    // }
    const accessStatus = () => {
        return group === 'learning' ||
            // 如果是learning直接显示
            (group === 'management' && session?.user?.role === 'mainAdmin')
            // 如果是management必须是管理员
    }
    return (
        <>
            {accessStatus() ?
                <>
                    <ItemEditor // wtest session
                        params={
                            {
                                group, // wtest learning -> group
                                urlDomain,
                                collectionName,
                                formConfig: learningItemConfig,
                            }
                        }
                        session={session}
                    ></ItemEditor>
                    <ListLearningItem
                        params={
                            {
                                urlDomain,
                                collectionName,
                            }
                        }
                        listData={listData}
                        session={session}
                    ></ListLearningItem>
                </> :
                <p>Only admins can see those data.</p>
            }
            
        </>
    )
}