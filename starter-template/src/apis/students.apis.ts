import { IStudent, Student } from 'types/students.type'
import http from 'utils/http'

export const getStudents = (page: number | string, limit: number | string) => {
  console.log('fetch', page, limit)
  return http.get<Student>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })
}
export const addStudent = (student: Omit<IStudent, 'id'>) => http.post('students', student)
