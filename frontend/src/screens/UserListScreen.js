import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
/* 
dung usestate tạo ra state searchTerm để lưu dữ liệu từ đầu vào tìm kiếm vào mỗi lần xảy ra sự kiện thay đổi. 
Phương thức handleChange lấy đối tượng sự kiện làm đối số và đặt giá trị hiện tại của biểu mẫu thành trạng thái searchTerm 
bằng cách sử dụng phương thức setSearchTerm do phương thức React.useState cung cấp.

Search cho product :D
 */

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  /*  
phương thức bộ lọc được áp dụng cho mảng product trả về một mảng mới theo điều kiện được trả về trong mỗi lần lặp.

Search cho product :D
*/
  const results = !searchTerm
    ? users
    : users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <>
    <Row className='align-items-center'>
    <Col>
    <h1>Users</h1>
    </Col>
    <Form>
      <Form.Control
      /* form tạo searchbar của boosttrap */
        type='text'
        className='mr-sm-2 '
        placeholder='Search Users name'
        value={searchTerm}
        onChange={handleChange}
      ></Form.Control>
    </Form>
    </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (

        
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/*gắn hàm result ở trên cùng rồi map nó cho product để render ra */}
            {results.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
