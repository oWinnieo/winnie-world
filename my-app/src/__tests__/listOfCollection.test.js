import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { ListOfCollection } from '@/app/components/list/listOfCollection/listOfCollection'
import { getListDataOfItems } from '@/lib/getData'


jest.mock('@/app/components/item/itemEditor/itemEditor', () => ({
    ItemEditor: () => <div data-testid="item-editor">Mock ItemEditor</div>,
}))
jest.mock('@/app/components/list/listLearningItem/listLearningItem', () => ({
    ListLearningItem: () => <div data-testid="list-learning-item">Mock ListLearningItem</div>,
}))
// jest.mock('@/app/components/pagination/pagination', () => ({
//     Pagination: ({ onPageChange, onLimitChange }) => (
//       <div data-testid="pagination" />
//     ),
//   }))
jest.mock('@/app/components/pagination/pagination', () => ({
    Pagination: ({ onPageChange }) => (
        <div data-testid="pagination" onClick={() => onPageChange(2)}>
        Pagination
        </div>
    ),
}))

const listOfData = {
    "dataNew":[
        {
            "_id":"68245f7b9a247a3eb144b89d",
            "title":"111",
            "content":"<p>111</p>",
            "authorId":"adminid",
            "tags":[],
            "status":"released",
            "createdAt":"2025-05-14T09:16:43.087Z",
            "updatedAt":"2025-05-14T09:16:43.087Z",
            "__v":0,
            "authorInfo": {
                "_id":"67cc69a9887513096c738abf",
                "name":"Ryuuna R",
                "email":"ryuuna2010@gmail.com",
                "userId":"adminid",
                "image":"https://aa.png",
                "role":"mainAdmin",
                "__v":0,
                "updatedAt":"2025-03-13T13:48:22.644Z",
                "editorId":"adminid"
            },
            "countComment":0,
            "countLike":0,
            "countFavorite":0,
            "countShare":0,
            "contentSliced":"111"
        },
        {
            "_id":"68245f5b9a247a3eb144b87f",
            "title":"11",
            "content":"<p>11</p>",
            "authorId":"adminid",
            "tags":[],
            "status":"released",
            "createdAt":"2025-05-14T09:16:11.216Z",
            "updatedAt":"2025-05-14T09:16:11.216Z",
            "__v":0,
            "authorInfo": {
                "_id":"67cc69a9887513096c738abf",
                "name":"Ryuuna R",
                "email":"ryuuna2010@gmail.com",
                "userId":"adminid",
                "image":"https://aa.png",
                "role":"mainAdmin",
                "__v":0,
                "updatedAt":"2025-03-13T13:48:22.644Z",
                "editorId":"adminid"
            },
            "countComment":0,
            "countLike":0,
            "countFavorite":0,
            "countShare":0,
            "contentSliced":"11"
        }
    ],
    "totalItems":11,
    "totalPages":6,
    "currentPage":1
}

// jest.mock('@/lib/getData', () => {
//     return {
//         getListDataOfItems: jest.fn().mockImplementation(() => Promise.resolve({...listOfData})),
//     }
// })




const defaultProps = {
    "urlDomain":"learning",
    "collectionName":"english",
    "learningItemConfig": {
        "title": {
            "title":"Title",
            "editType":"text",
            "default":"",
            "required":true
        },
        "status": {
            "title":"Status",
            "editType":"radioBox",
            "default":"draft",
            "required":true,
            "options": [
                {"name":"draft","lvl":0},
                {"name":"released","lvl":1}
            ]
        },
        "content": {
            "title":"Content",
            "editType":"richText",
            "default":"",
            "required":true
        },
        "authorInfo":{},
        "tags":{}
    },
    "session": {
        "user": {
            "name":"aa",
            "email":"aa@qq.com",
            "userId":"123",
            "image":"https://aa.png",
            "role":"mainAdmin"
        }
    }
}
const defaultPropsWithGroupOfLearning = {
    urlDomain: '/api/test',
    group: 'learning',
    collectionName: 'testCollection',
    learningItemConfig: {},
    session: { user: { role: 'user' } },
  }
const defaultPropsWithGroupOfLearning1 = {
    ...defaultProps,
    group: 'learning'
}
const propsWithGroupManagementAndMainAdmin = {
    ...defaultProps,
    group: 'management'
}
const propsWithGroupManagementNoMainAdmin = {
    ...defaultProps,
    group: 'management',
    "session": {
        "user": {
            "name":"aa",
            "email":"aa@qq.com",
            "userId":"123",
            "image":"https://aa.png",
            "role":"user"
        }
    }
}

function flushPromises() {
    return new Promise(resolve => setTimeout(resolve, 0))
  }

  jest.mock('@/lib/getData', () => {
    return {
      getListDataOfItems: jest.fn().mockImplementation(() => ({
        ...listOfData, // 直接返回不是 Promise
      })),
    }
  })

describe('ListOfCollection component', () => {
    it('basic display with no group',  async () => {
        // jest.mock('@/lib/getData', () => ({
        //     getListDataOfItems: jest.fn(),
        //   }))
        await act(async () => {
            render(<ListOfCollection {...defaultProps} />)
            // flush promises that are scheduled in useEffect
            await flushPromises()
          })
        expect(screen.getByText('Only admins can see those data.')).toBeInTheDocument()
    })
    
    it('basic display with group of learning', async () => {
        
        getListDataOfItems.mockResolvedValue(listOfData)
        
        // 等待异步加载完成后再断言
        await act(async () => {
            // 等状态更新结束
            render(<ListOfCollection {...defaultPropsWithGroupOfLearning} />)
          })

        await waitFor(() => {
          expect(screen.getByTestId('item-editor')).toBeInTheDocument()
        //   expect(screen.getByTestId('list-learning-item')).toBeInTheDocument()
        //   expect(screen.getAllByTestId('pagination')).toHaveLength(2) // 上下两个
        })
    })
    it('basic display with group of management and mainAdmin', async () => {
        
        getListDataOfItems.mockResolvedValue(listOfData)
        
        await act(async () => {
            // 等状态更新结束
            render(
                <ListOfCollection {...propsWithGroupManagementAndMainAdmin} />
            )
          })
        
        expect(screen.getByTestId('item-editor')).toBeInTheDocument()
        expect(screen.getByTestId('list-learning-item')).toBeInTheDocument()
        expect(screen.getAllByTestId('pagination')).toHaveLength(2)
    })
    it('basic display with group of management and no mainAdmin', async () => {
        
        getListDataOfItems.mockResolvedValue(listOfData)
        await act(async () => {
            render(
                <ListOfCollection {...propsWithGroupManagementNoMainAdmin} />
            )
        })
        
        expect(screen.getByText('Only admins can see those data.')).toBeInTheDocument()
    })

    it('shows loading when date fetching', async () => {
        let resolvePromise
        getListDataOfItems.mockReturnValue(
            new Promise((resolve) => {
                resolvePromise = resolve
            })
        )
        await act(async () => {
            render(<ListOfCollection {...defaultPropsWithGroupOfLearning} />)
        })
        expect(screen.getByText('Loading...')).toBeInTheDocument()
        await act(async () => {
            resolvePromise({
              dataNew: [],
              totalItems: 0,
              totalPages: 1,
              currentPage: 1,
            })
        })
        await waitFor(() => {
            expect(screen.getByText('No Data')).toBeInTheDocument()
        })
    })
    it('triggers pagination callback correctly', async () => {
        getListDataOfItems.mockResolvedValue({
          dataNew: [{ _id: '1', name: 'Item 1' }],
          totalItems: 1,
          totalPages: 2,
          currentPage: 1,
        })
    
        await act(async () => {
          render(<ListOfCollection {...defaultPropsWithGroupOfLearning} />)
        })
    
        const paginations = screen.getAllByTestId('pagination')
        expect(paginations).toHaveLength(2)
    
        // 模拟点击分页组件（它内部调用 onPageChange）
        act(() => {
          paginations[0].click()
        })
    
        await waitFor(() => {
          expect(getListDataOfItems).toHaveBeenCalledWith(
            expect.objectContaining({ page: 2 })
          )
        })
    })



})
