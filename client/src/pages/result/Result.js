import {  useEffect, useState } from "react";
import rawData from "../../data/kujiHelplineSheet.json";
import Table from "react-bootstrap/Table";
import  "./Result.css";
import Form from "react-bootstrap/Form";
export default function Result() {
  const [service,setService]=useState("Legal Aid");
  const [location,setLocation]=useState("North");
  const [data, setData] = useState([]);
    useEffect(()=>{
        function getData(){
         setData(rawData);
        }
    getData();
    },[]);

    function selectService(e) {
      setService(e.target.value);
    }

    function selectLocation(e) {
      setLocation(e.target.value);
    }
  return (
    <>
    <Form>
      <Form.Group className="select-group" controlId="service">
        <Form.Label>Service</Form.Label>
        <Form.Select aria-label="Service" value={service} onChange={selectService}>
          {[...new Set(data.map((item) => item.Themes))].map((item,index)=>(
            <option  key={index}>{item}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="select-group" controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Select aria-label="Location" value={location} onChange={selectLocation}>
          {[...new Set(data.map((item) => item.Zone))].map((item,index)=>(
            <option key={index}>{item}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
    <br></br>
    <h3 className="bg-primary header-list">List of NGOs</h3>
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
      {data.filter((item)=> item.Themes=== service && item.Zone===location).map((item) => (
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
  </>);
  }