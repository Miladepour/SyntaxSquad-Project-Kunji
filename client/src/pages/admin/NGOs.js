import { useEffect, useState } from "react";
import fileData from "./data/ngos.json";
import Table from "react-bootstrap/Table";

export default function NGOs() {
  const [ngos, setNGOs] = useState([]);

  useEffect(() => {
    const getNGOs = () => {
      setNGOs(fileData);
    }

    getNGOs();
  }, []);

  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Service</th>
          <th>Zone</th>
          <th>Organization</th>
          <th>Address</th>
          <th>Contact</th>
          <th>Website</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {ngos.map((ngo, i) => (
          <tr key={i}>
            <td>{ngo.service}</td>
            <td>{ngo.zone}</td>
            <td>{ngo.organization}</td>
            <td>{ngo.address}</td>
            <td>{ngo.contact}</td>
            <td>{ngo.website}</td>
            <td>{ngo.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}