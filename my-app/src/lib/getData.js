import { html2txt, strSliced } from '@/lib/utils';
const getOneItem = async (params) => {
    const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=one&id=${params.id}&sessionUserId=${params.sessionUserId}`, {
      cache: 'no-store', // 等效于 SSR 的行为
      credentials: "include"
      }).then(res => res.json());
    return data
}

const getListDataOfComments = async (params) => {
  const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&belongToItemCollection=${params.belongToItemCollection}&belongToItemId=${params.belongToItemId}&sessionUserId=${params.sessionUserId}`, {
    cache: 'no-store',
    credentials: "include"
  }).then(res => res.json())
  return data
}

const getListDataOfNav = async (params) => {
  try {
      const { data, success, skipNum, limitNum } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&group=${params.group}`, {
          cache: 'no-store'
      }).then(res => res.json())
      const dataNew = data?.map(item => (
          {
              ...item,
              isEditItem: false
          }
      ))
      if (success) {
          console.log(success)
          return dataNew
      } else {
          throw new Error('Failed to create an item.')
      }
  } catch (err) {
      console.log(err)
  }
}
const getColLearning = async (params) => {
  const listLearningFromApi = await getListDataOfNav({
    group: params.group,
    urlDomain: params.urlDomain,
    collectionName: 'listNav'
  })
  return listLearningFromApi.map(item => item.colName).filter(colName => colName !== 'user')
}

const getListDataOfItems = async (params) => {
  const { data } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&status=released`, {
      cache: 'no-store', // 等效于 SSR 的行为
      }).then(res => res.json());
  const colLearning = await getColLearning({
    group: params.group,
    urlDomain: params.urlDomain,
    collectionName: 'listNav'
  })
  const dataNew = data && data.length > 0 ? data.map(item => {
      const itemNew = colLearning.includes(params.collectionName) ? {
          ...item,
          contentSliced: strSliced(html2txt(item.content), 200)
      } : (
          params.collectionName === 'user' ? {
              ...item,
              isEditItem: false
          } : item
      )
      return itemNew
  }) : []
  return dataNew
}




export {
    getOneItem,
    getListDataOfComments,
    getListDataOfItems,
    getListDataOfNav,
    getColLearning
}