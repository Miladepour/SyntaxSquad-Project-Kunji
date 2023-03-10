import {  useEffect, useState } from "react";
import rawData from "../../data/kujiHelplineSheet.json";
import Table from "react-bootstrap/Table";
import  "./Result.css";
import  Button  from "react-bootstrap/Button";
export default function Result() {
  const [service,setService]=useState("");
  const [location,setLocation]=useState("");
  function handleChange(){
    setService(service);
    setLocation(location);
  }
  const [data, setData] = useState([]);
    useEffect(()=>{
        function getData(){
         setData(rawData);
        }
    getData();
    },[]);
  return (
    <>
    <Button onClick={handleChange}>Filter</Button>
    <Button>Location:<span>{location}</span></Button>
    <Button>Service requested:<span>{service}</span></Button>
    <br></br>
    <Button className="button-list">List Of NGOs</Button>
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
        {/* filter the data ehich came from pre page/data.filter((item)=> item.Themes=== service && item.Zone===location). for filtering data*/}
      {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
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