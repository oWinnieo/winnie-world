import { useEffect, useState } from 'react';
import { getListDataOfItems } from '@/lib/getData'

const wtest_p1 = {"urlDomain":"http://localhost:3000/api/learning","collectionName":"english","group":"learning","page":1,"limit":5}
// const wtest_p2 = {
//     urlDomain,
//     collectionName,
//     group,
//     page: 1,
//     limit: 100
// }

export const Greet = (defaultProps) => {
    const accessStatus = () => {
        return group === 'learning' ||
            // 如果是learning直接显示
            (group === 'management' && session?.user?.role === 'mainAdmin')
            // 如果是management必须是管理员
    }
    const {
        urlDomain,
        group,
        collectionName,
        learningItemConfig,
        // listData, // wtest page
        session
    } = defaultProps
    const [d1, setD1] = useState('0')
    const [d2, setD2] = useState('0')
    const [listData, setListData] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [isLoading, setIsLoading] = useState(false)
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [d3, setD3] = useState('0')
    const getListDataOfCol = async ({ urlDomain }) => {
        setListData([])
        const {
            dataNew: listData,
            totalItems,
            totalPages,
            currentPage
        } = await getListDataOfItems({
            ...wtest_p1,
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
        setListData(listData)
        setTotalItems(totalItems)
        setTotalPages(totalPages)
        setCurrentPage(currentPage)
    }
    useEffect(() => {
        // let t1 = setTimeout(() => {
        //     setD1('12')
        // }, 1000)
        const fetchData = async () => {
            // setIsLoading(true)
            await getListDataOfCol({ urlDomain })
            // setIsLoading(false)
            setD1('12')
            setD2('12')
        }
        fetchData()
    }, [page, limit])
    // return (<>
    //     <h1>Greet component here wtest</h1>
    //     <h2>d1: {d1}</h2>
    // </>)
    return (
            <>
            <h1>Greet component here wtest</h1>
            <h2>d1: {d1}</h2>
                {accessStatus() ?
                    <>11
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
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                            limit={limit}
                            onLimitChange={setLimit}
                        />
                        <>
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
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                            limit={limit}
                            onLimitChange={setLimit}
                        />
                    </> :
                    <p>Only admins can see those data.</p>
                }
                
            </>
        )
}