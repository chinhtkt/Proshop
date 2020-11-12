import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
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

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

   /*  
phương thức bộ lọc được áp dụng cho mảng product trả về một mảng mới theo điều kiện được trả về trong mỗi lần lặp.

Search cho product :D
*/
  const results = !searchTerm
    ? orders
    : orders.filter(order =>
        order.user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  return (
    <>
    <Row className='align-items-center'>
    <Col>
      <h1>Orders</h1>
      </Col>
      <Form>
      <Form.Control
      /* form tạo searchbar của boosttrap */
        type='text'
        placeholder='Search Order Users Name'
        className='mr-sm-2'
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/*gắn hàm result ở trên cùng rồi map nó cho product để render ra */}
            {results.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
