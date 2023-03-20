import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Table from 'react-bootstrap/Table';
import "./UserView.css"
import React, { useEffect, useState } from "react";

export function UserView() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `http://localhost:3000/api/`
          },
        });

        const res = await fetch("http://localhost:3000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });

        const users = await res.json();
        setDatas(users);

      } catch (e) {
        console.log(e.message);
      }
    }

    getUsers();
  }, [getAccessTokenSilently]);

  return(
    <div>
      {isAuthenticated &&
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
            {datas.map(val => {
              return <tr key={val.user_id}>
                <td>{val.user_id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.gender}</td>
                <td>{val.date_of_birth}</td>
                <td>{val.current_location}</td>
                <td>{val.pin_code}</td>
                <td>{val.phone_number}</td>
                <td>{val.qualification}</td>
                <td>{val.date_of_release}</td>
                <td>{val.case_status}</td>
              </tr>
            })}
          </tbody>
        </Table>
      }
    </div>
  );
}

export default withAuthenticationRequired(UserView);