
import Table from 'react-bootstrap/Table';
import "./UserView.css"
import React, { useEffect, useState } from "react";

export default function UserView() {
    const [datas,setDatas] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3100/api/admin/users")
        .then((res) => res.json())
        .then((data)=> setDatas(data))
        
    
        

    },[])
console.log(datas)
    
      return (
        
        <Table className='resize' striped bordered responsive="lg" size="xl">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Current Location</th>
              <th>Pincode</th>
              <th>Phone Number</th>
              <th>Qualification</th>
              <th>Date of Release</th>
              <th>Case Status</th>
            </tr>
          </thead>
          <tbody>
            {datas.map(val=>{
                return <tr>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.gender}</td>
                <td>{val.dateOfBirth}</td>
                <td>{val.currentLocation}</td>
                <td>{val.pincode}</td>
                <td>{val.phoneNumber}</td>
                <td>{val.educationalQualification}</td>
                <td>{val.dateOfRelease}</td>
                <td>{val.caseStatus}</td>
               </tr>
            })}
                
           
             
            
            
          </tbody>
        </Table>
        
      );
    }
    