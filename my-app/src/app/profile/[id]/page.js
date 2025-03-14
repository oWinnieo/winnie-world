import { PageWrap } from '@components/pageWrap/pageWrap'
import { UserProfile } from '@components/userProfile/userProfile'
import { tips } from '@/constants/tips'
const getOneItem = async (params) => {
    // console.log('params', params)
    const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=one&userId=${params.id}`, {
        cache: 'no-store',
      }).then(res => res.json())
      console.log('data', data)
    return data
}
export default async function Profile ({ params }) {
    const { id } = await params
    const dataUser = await getOneItem({
        urlDomain: `${process.env.URL_DOMAIN}/api/learning`,
        collectionName: 'user',
        id
    })
    return (
        <>
            <PageWrap>
                {
                    dataUser ? <UserProfile
                        dataUser={dataUser}
                    ></UserProfile> :
                    <p>{tips.tipDataWrong}</p>
                }
            </PageWrap>
        </>
    )
}
