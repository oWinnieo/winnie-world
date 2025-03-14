import { ItemEditor } from '@/app/components/itemEditor/itemEditor'
import { LearningItemList } from '@/app/components/learningItemList/learningItemList'
import { sessionInfo } from '@/app/components/sessionInfo' // wtest mock
export const ListOfCollection = ({
    urlDomain,
    group,
    collectionName,
    learningItemConfig
}) => {
    /* wtest auth mock */
    const session = sessionInfo()
    /* /wtest auth mock */
    return (
        <>
            {session.user.role === 'mainAdmin' ?
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
                    <LearningItemList
                    params={
                        {
                        urlDomain,
                        collectionName,
                        }
                    }
                    ></LearningItemList>
                </> :
                <p>Only admins can see those data.</p>
            }
            
        </>
    )
}