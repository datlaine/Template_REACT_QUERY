import { useQuery } from '@tanstack/react-query'
import { getStudents } from 'apis/students.apis'
import classNames from 'classnames'
import { Link, useSearchParams } from 'react-router-dom'
import { useSearchParamesCustom } from 'utils/useSearchParams'

const LIMIT = 10

export default function Students() {
  // search -> array -> ['_page', 'numberPage']
  // console.log([...search])
  // console.log(page)
  const pageResult: { page?: string } = useSearchParamesCustom()
  const removeUndefined = Number(pageResult.page) || 1

  // console.log(
  //   '>>>check page_result',
  //   pageResult.page
  // )
  // console.log(
  //   'check und',
  //   pageResult.page
  // )
  // console.log(
  //   'check param',
  //   removeUndefined
  // )

  // const data1 = getStudents(
  //   removeUndefined,
  //   LIMIT
  // ).then((data) => console.log(data))

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['students', removeUndefined],
    queryFn: () => getStudents(removeUndefined, LIMIT),
    keepPreviousData: true
  })

  console.group('RENDER')
  console.log('>>>check data: ', data)
  console.log('>>>check isLoading: ', isLoading)
  console.log('>>>check isFetching: ', isFetching)
  console.log('')
  console.groupEnd()
  console.log('MAIN_RE-RENDER')
  const countStudents = Number(data?.headers['x-total-count']) || 0
  const totalPage = Math.ceil(countStudents / LIMIT)
  // console.log('>>> check totalPage: ', totalPage)
  // console.log(data)

  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      <div className='mt-6'>
        <Link
          to={'/students/add'}
          className='rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'
        >
          Add Student
        </Link>
      </div>
      {isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
          <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='py-3 px-6'>
                #
              </th>
              <th scope='col' className='py-3 px-6'>
                Avatar
              </th>
              <th scope='col' className='py-3 px-6'>
                Name
              </th>
              <th scope='col' className='py-3 px-6'>
                Email
              </th>
              <th scope='col' className='py-3 px-6'>
                <span className='sr-only'>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((student) => (
              <tr
                key={student.id}
                className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
              >
                <td className='py-4 px-6'>{student.id}</td>
                <td className='py-4 px-6'>
                  <img src={student.avatar} alt='student' className='h-5 w-5' />
                </td>
                <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                  {student.last_name}
                </th>
                <td className='py-4 px-6'>{student.email}</td>
                <td className='py-4 px-6 text-right'>
                  <Link
                    to={`/students/${student.id}`}
                    className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                  >
                    Edit
                  </Link>
                  <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 flex justify-center'>
        <nav aria-label='Page navigation example'>
          <ul className='inline-flex -space-x-px'>
            <li>
              {removeUndefined === 1 ? (
                <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'>
                  Trang trước
                </span>
              ) : (
                <Link
                  to={`/students?page=${removeUndefined - 1}`}
                  className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                >
                  Trang trước
                </Link>
              )}
            </li>
            {Array(totalPage)
              .fill(1)
              .map((_i, index) => {
                let page = index + 1
                return (
                  <li key={page}>
                    <Link
                      className={classNames(
                        'border border-gray-300 bg-white bg-white py-2 px-3 leading-tight text-gray-500 text-gray-500',
                        {
                          'bg-zinc-900': page === removeUndefined,
                          'text-slate-200': page === removeUndefined,
                          'hover:bg-gray-100 hover:bg-gray-100 hover:text-gray-700 hover:text-gray-700':
                            page !== removeUndefined
                        }
                      )}
                      to={`/students?page=${page}`}
                    >
                      {page}
                    </Link>
                  </li>
                )
              })}
            <li>
              {removeUndefined === totalPage ? (
                <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'>
                  Trang kế
                </span>
              ) : (
                <Link
                  className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  to={`/students?page=${removeUndefined + 1}`}
                >
                  Trang kế
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
