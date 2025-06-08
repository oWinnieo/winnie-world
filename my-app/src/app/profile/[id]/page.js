import { PageWrap } from '@components/pageWrap/pageWrap'
import { UserProfile } from '@components/userRelated/userProfile/userProfile'
import { tipsConst } from '@/constants/tipsConst'
const getOneItem = async (params) => {
    const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=one&userId=${params.id}`, {
        cache: 'no-store',
      }).then(res => res.json())
    return data
}
export default async function Profile ({ params }) {
    const { id } = await params
    const urlDomain = `${process.env.URL_DOMAIN}/api/learning`
    const dataUser = await getOneItem({
        urlDomain,
        collectionName: 'user',
        id
    })
    return (
        <>
            <PageWrap>
                {
                    dataUser ? <UserProfile
                        urlDomain={urlDomain}
                        dataUser={dataUser}
                    ></UserProfile> :
                    <p>{tipsConst.tipDataWrong}</p>
                }
            </PageWrap>
        </>
    )
}
