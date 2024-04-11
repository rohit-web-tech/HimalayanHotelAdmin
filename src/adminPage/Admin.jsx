import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const { TabPane } = Tabs;
import "./style.scss"
const BASE_URL = import.meta.env.VITE_BASE_URL ;
const Admin = () => {
    return (
        <div id="admin-panel">
            <h1>Admin Panel</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="BOOKINGS" key="1">
                    <AllBookings />
                </TabPane>
                <TabPane tab="ROOMS" key="2">
                    <AllRooms />
                </TabPane>
                <TabPane tab="ADD ROOMS" key="4">
                    <AddRoom />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Admin;

export function AllBookings() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch(`${BASE_URL}/allBookings`)
            .then(res => res.json())
            .then(res => {
                if (res.message === "success") {
                    setBookings(res.bookings);
                } else {
                    alert(res.message);
                }
            }).catch(err => console.log(err));
    }, [])
    return (
        <div className="container-box">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Sr.No.</th>
                    <th>Booking Id</th>
                    <th>UserId</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Room</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    bookings.map((booking,index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{booking?._id}</td>
                                <td>{booking?.userId}</td>
                                <td>{booking?.userName}</td>
                                <td>{booking?.userEmail}</td>
                                <td>{booking?.roomName}</td>
                                <td>{booking?.fromDate}</td>
                                <td>{booking?.toDate}</td>
                                <td>{booking?.status}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
    )
}

export function AllRooms() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        fetch(`${BASE_URL}/getRooms`)
            .then(res => res.json())
            .then(res => {
                    setRooms(res);
            }).catch(err => console.log(err));
    }, [])
    return (
        <div className="container-box">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Sr.No.</th>
                    <th>Room Id</th>
                    <th>Room Name</th>
                    <th>Room No</th>
                    <th>Max Count</th>
                    <th>Rent</th>
                </tr>
            </thead>
            <tbody>
                {
                    rooms.map((room,index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{room?._id}</td>
                                <td>{room?.roomName}</td>
                                <td>{room?.room_id}</td>
                                <td>{room?.maxCount}</td>
                                <td>{room?.roomRent}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
    )
}

export function AddRoom() {
    const [roomData , setRoomData] = useState({
        roomName : "" ,
        roomRent : "" ,
        room_id : "" ,
        maxCount : "" ,
        imageUrl : "" 
    }) ;
    let handleRoomInput=(e)=>{
        setRoomData({...roomData,[e.target.name]:e.target.value});
    }
    let handleRoomSubmit = (e) =>{
        e.preventDefault();
        fetch(`${BASE_URL}/setRoomData`,{
            "method" : "POST", 
            "body" : JSON.stringify(roomData),
            "headers" : {
                "content-type" : "application/json"
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            console.log(res.message)
            if(res.message==="success"){
                setRoomData({
                    roomName : "" ,
                    roomRent : "" ,
                    room_id : "" ,
                    maxCount : "" ,
                    imageUrl : "" 
                });
                alert("room saved");
            }else{
                alert(res.message);
            }
        }).catch(err=>console.log(err))
    }
    return (
        <Form onSubmit={handleRoomSubmit}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Room Name</Form.Label>
            <Form.Control id="disabledTextInput" placeholder="Enter Room Name" required onChange={handleRoomInput} value={roomData.roomName} name="roomName"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Room Number</Form.Label>
            <Form.Control id="disabledTextInput" placeholder="Enter Room No" required onChange={handleRoomInput} value={roomData.room_id} name="room_id"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Rent Per Night</Form.Label>
            <Form.Control id="disabledTextInput" placeholder="Enter Room Rent" required onChange={handleRoomInput} value={roomData.roomRent} name="roomRent"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Maximum Member</Form.Label>
            <Form.Control id="disabledTextInput" placeholder="Enter Max Members" required onChange={handleRoomInput} value={roomData.maxCount} name="maxCount"/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Image Url</Form.Label>
            <Form.Control id="disabledTextInput" placeholder="Enter Image Url" required onChange={handleRoomInput} value={roomData.imageUrl} name="imageUrl"/>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </fieldset>
      </Form>
        )
}
