import {  useEffect, useState } from "react";

import { Table } from "react-bootstrap";
import rawData from "../../data/kujiHelplineSheet.json";
import  "./Result.css";

export default function Result() {
  // let simplevar,variable;/*for the filtered data  came from preference page/*
  const [data, setData] = useState([]);
    useEffect(()=>{
        function getData(){
         setData(rawData);
        }
    getData();
    },[]);
  return (
    <Table striped bordered hover >
       <thead>
        <tr>
          <th>Themes</th>
          <th>Zone</th>
          <th>Organization</th>
          <th>Address</th>
          <th>Contact</th>
          <th>Website</th>
          <th>EmailAddress</th>
       </tr>
      </thead>
      <tbody>
      {data.map((item) => (
          <tr key={item.id}>
          <td>{item.Themes}</td>
          <td>{item.Zone}</td>
          <td>{item.Organization}</td>
          <td>{item.Address}</td>
          <td>{item.contact}</td>
          <td>{item.Website}</td>
          <td>{item.EmailAddress}</td>
          </tr>
        ))}
        </tbody>
   </Table>
  );
  }