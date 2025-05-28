'use client'
import { ItemEditor } from '@/app/components/item/itemEditor/itemEditor'
import { ListLearningItem } from '@/app/components/list/listLearningItem/listLearningItem'

/* wtest pagination */
import { getListDataOfItems } from '@/lib/getData'
import { Pagination } from '@/app/components/pagination/pagination'
import { useEffect, useState } from 'react';
// interface Item {
//   _id: string;
//   name: string;
// }

// interface PaginationResponse {
//   items: Item[];
//   totalItems: number;
//   totalPages: number;
//   currentPage: number;
// }
/* /wtest pagination */

export const ListOfCollection = ({
    urlDomain,
    group,
    collectionName,
    learningItemConfig,
    // listData, // wtest page
    session
}) => { // wtest session here
    const accessStatus = () => {
        return group === 'learning' ||
            // 如果是learning直接显示
            (group === 'management' && session?.user?.role === 'mainAdmin')
            // 如果是management必须是管理员
    }

    /* wtest page */
    // const [data, setData] = useState<PaginationResponse | null>(null);
    // const [data, setData] = useState(null);
    const [listData, setListData] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [isLoading, setIsLoading] = useState(false)
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const getListDataOfCol = async ({ urlDomain }) => {
        setListData([])
        const {
            dataNew: listData,
            totalItems,
            totalPages,
            currentPage
        } = await getListDataOfItems({
            urlDomain,
            collectionName,
            group,
            page,
            limit
        });
        // const wtest_d = 
        //     {
        //         listData,
        //         totalItems,
        //         totalPages,
        //         currentPage
        //     }
        // console.log('wtest_d', JSON.stringify(wtest_d))
        // setListData(listData)
        // setTotalItems(totalItems)
        // setTotalPages(totalPages)
        // setCurrentPage(currentPage)
    }
    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true)
            await getListDataOfCol({ urlDomain })
            // setIsLoading(false)
        }
        fetchData()
      }, [page, limit]);
    /* /wtest page */
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
                    {/* <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                        limit={limit}
                        onLimitChange={setLimit}
                    /> */}
                    <>
                        {/* <p>wtest ?? {JSON.stringify(listData)}</p> */}
                        {
                            !listData || listData.length <= 0 ? <p>{isLoading ? 'Loading...' : 'No Data'}</p> :
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
                        }
                    </>
                    {/* <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                        limit={limit}
                        onLimitChange={setLimit}
                    /> */}
                </> :
                <p>Only admins can see those data.</p>
            }
            
        </>
    )
}