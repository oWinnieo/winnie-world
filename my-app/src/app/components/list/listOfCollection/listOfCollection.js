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
                                group,
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