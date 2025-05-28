import React from 'react'
import { render, screen } from '@testing-library/react'
import { ListLearningItem } from '@/app/components/list/listLearningItem/listLearningItem'

// Mock 子组件，避免深层渲染依赖
jest.mock('@/app/components/item/itemEditor/itemEditor', () => ({
    // '@/app/components/item/itemEditor/itemEditor'
    // '<rootDir>/app/components/item/itemEditor/itemEditor'
  ItemEditor: () => <div data-testid="item-editor">Mock ItemEditor</div>,
}))

jest.mock('@/app/components/item/itemLearning/itemLearning', () => ({
  ItemLearning: () => <div data-testid="item-learning">Mock ItemLearning</div>,
}))

describe('ListLearningItem component', () => {
  it('在没有数据时显示 "No Data" 提示', () => {
    render(
      <ListLearningItem
        params={{ collectionName: 'user' }}
        listData={[]}
        session={null}
      />
    )
    expect(screen.getByText(/No Data/i)).toBeInTheDocument()
  })

  it('当 collectionName 是 user 时，渲染 ItemEditor', () => {
    const mockListData = [{ _id: '1', title: 'User Title' }]
    render(
      <ListLearningItem
        params={{ collectionName: 'user', urlDomain: 'test.com' }}
        listData={mockListData}
        session={{ user: 'mock' }}
      />
    )
    expect(screen.getByTestId('item-editor')).toBeInTheDocument()
  })

  it('当 collectionName 是其他值时，渲染 ItemLearning', () => {
    const mockListData = [{ _id: '2', title: 'Course Title' }]
    render(
      <ListLearningItem
        params={{ collectionName: 'course', urlDomain: 'test.com' }}
        listData={mockListData}
        session={{ user: 'mock' }}
      />
    )
    expect(screen.getByTestId('item-learning')).toBeInTheDocument()
  })
})