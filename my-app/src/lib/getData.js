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

const getListDataOfItems = async (params) => { // wtest page
  console.log('--->>> getListDataOfItems', JSON.stringify(params))
  // console.log('--------------??????????????', `${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&status=released&page=${params.page}&limit=${params.limit}`)
  const { data, totalItems, totalPages, currentPage } = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}&fetchType=list&status=released&page=${params.page}&limit=${params.limit}`, {
      cache: 'no-store', // 等效于 SSR 的行为
      }).then(res => res.json());
  console.log(' ===>>> wtest totalItems, totalPages, currentPage ???', totalItems, totalPages, currentPage, 'params', params)
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
  return {
    dataNew,
    totalItems,
    totalPages,
    currentPage
  }
  // return {
  //   dataNew: [2,2]
  // }
}

const getListDataOfItems_wtest = () => {
  return {
    dataNew: [1,1,1]
  }
}




export {
    getOneItem,
    getListDataOfComments,
    getListDataOfItems,
    getListDataOfNav,
    getColLearning
}