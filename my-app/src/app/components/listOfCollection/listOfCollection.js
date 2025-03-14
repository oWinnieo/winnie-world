'use client'
import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
import { ListLearningItem } from '@/app/components/listLearningItem/listLearningItem'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
export const ListOfCollection = ({
    urlDomain,
    group,
    collectionName,
    learningItemConfig,
    listData
}) => {
    console.log('group', group)
    /* wtest auth mock */
    const session = sessionInfo()
    /* /wtest auth mock */
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
                    <ItemEditor
                        params={
                            {
                                group, // wtest learning -> group
                                urlDomain,
                                collectionName,
                                formConfig: learningItemConfig,
                            }
                        }
                    ></ItemEditor>
                    <ListLearningItem
                        params={
                            {
                                urlDomain,
                                collectionName,
                            }
                        }
                        listData={listData}
                    ></ListLearningItem>
                </> :
                <p>Only admins can see those data.</p>
            }
            
        </>
    )
}