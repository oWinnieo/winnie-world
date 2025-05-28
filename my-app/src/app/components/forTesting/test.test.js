import { render, screen, waitFor, act } from '@testing-library/react'
import { ListOfCollection } from '@/app/components/list/listOfCollection/listOfCollection'

// mock 所有子组件和 API
jest.mock('@/app/components/item/itemEditor/itemEditor', () => ({
  ItemEditor: () => <div data-testid="item-editor" />,
}))
jest.mock('@/app/components/list/listLearningItem/listLearningItem', () => ({
  ListLearningItem: () => <div data-testid="list-learning-item" />,
}))
jest.mock('@/app/components/pagination/pagination', () => ({
  Pagination: ({ onPageChange }) => (
    <div data-testid="pagination" onClick={() => onPageChange(2)}>
      Pagination
    </div>
  ),
}))
jest.mock('@/lib/getData', () => ({
  getListDataOfItems: jest.fn(),
}))

import { getListDataOfItems } from '@/lib/getData'

describe('ListOfCollection', () => {
  const defaultProps = {
    urlDomain: '/api/test',
    group: 'learning',
    collectionName: 'testCollection',
    learningItemConfig: {},
    session: { user: { role: 'user' } },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders full content when access is allowed and data loads', async () => {
    // 模拟接口返回
    getListDataOfItems.mockResolvedValue({
      dataNew: [{ _id: '1', name: 'Item 1' }],
      totalItems: 1,
      totalPages: 1,
      currentPage: 1,
    })

    await act(async () => {
      render(<ListOfCollection {...defaultProps} />)
    })

    await waitFor(() => {
      expect(screen.getByTestId('item-editor')).toBeInTheDocument()
      expect(screen.getByTestId('list-learning-item')).toBeInTheDocument()
      expect(screen.getAllByTestId('pagination')).toHaveLength(2)
    })
  })

  it('shows loading state when data is fetching', async () => {
    let resolvePromise
    getListDataOfItems.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve
      })
    )

    await act(async () => {
      render(<ListOfCollection {...defaultProps} />)
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // 完成异步
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

  it('renders "No Data" if list is empty', async () => {
    getListDataOfItems.mockResolvedValue({
      dataNew: [],
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
    })

    await act(async () => {
      render(<ListOfCollection {...defaultProps} />)
    })

    await waitFor(() => {
      expect(screen.getByText('No Data')).toBeInTheDocument()
    })
  })

  it('renders fallback message when user has no access', async () => {
    const noAccessProps = {
      ...defaultProps,
      group: 'management',
      session: { user: { role: 'user' } }, // not mainAdmin
    }

    render(<ListOfCollection {...noAccessProps} />)

    expect(screen.getByText('Only admins can see those data.')).toBeInTheDocument()
  })

  it('triggers pagination callback correctly', async () => {
    getListDataOfItems.mockResolvedValue({
      dataNew: [{ _id: '1', name: 'Item 1' }],
      totalItems: 1,
      totalPages: 2,
      currentPage: 1,
    })

    await act(async () => {
      render(<ListOfCollection {...defaultProps} />)
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