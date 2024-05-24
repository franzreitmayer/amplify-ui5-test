import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Toolbar } from '@ui5/webcomponents-react';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import {
  Table,
  TableRow,
  TableCell,
  TableColumn,
  Label,
  ToolbarV2,
  ToolbarSeparatorV2,
  ToolbarSpacerV2,
  ToolbarButton,
  ToolbarSelect,
  ToolbarSelectOption
} from '@ui5/webcomponents-react';
import { generateClient } from "aws-amplify/data";


const client = generateClient({
  authMode: 'userPool'
});

function App() {
  const [timetracks, setTimetracks] = useState([]);
  const [count, setCount] = useState(0);



  // const loadInitialTimetracks = async () => {
  //   const { newTimetrack, newError } =  await client.models.Timetrack.create({
  //     title: 'Test',
  //     description: 'Test'
  //   });
  //   console.log(`New Timetrack: ${newTimetrack}, error: ${newError}`);
  //   const { allTimetracks, errors } = await client.models.Timetrack.list();
  //   console.log(`Errors: ${errors}`);
  //   console.log("data: " + JSON.stringify(allTimetracks));
  //   return allTimetracks;
  // };

  useEffect(() => {
    client.models.Timetrack.observeQuery().subscribe({
      next: (data) => {
        console.log(JSON.stringify(data.items));
        setTimetracks(data.items);
      }
    });
  }, []);





  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <ToolbarV2
            alignContent={{
              End: 'End',
              Start: 'Start'
            }}
          >
            <ToolbarButton text="Create" />
            <ToolbarButton text="Edit" />
            <ToolbarButton text="Delete" />
          </ToolbarV2>
          <Table
            columns={<>
              <TableColumn><Label>Title</Label></TableColumn>
              <TableColumn><Label>Description</Label></TableColumn>
              <TableColumn><Label>Day</Label></TableColumn>
              <TableColumn><Label>From</Label></TableColumn>
              <TableColumn><Label>To</Label></TableColumn>
            </>}
          >
            {
              timetracks.map((timetrack) => (
                <TableRow>
                  <TableCell>
                    <Label>{timetrack.title}</Label>
                  </TableCell>
                  <TableCell>
                    <Label>{timetrack.description}</Label>
                  </TableCell>
                  <TableCell>
                    <Label>{timetrack.day}</Label>
                  </TableCell>
                  <TableCell>
                    <Label>{timetrack.from}</Label>
                  </TableCell>
                  <TableCell>
                    <Label>{timetrack.to}</Label>
                  </TableCell>
                </TableRow>
              ))
            }
          </Table>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
          <Button onClick={() => alert('Hello World!')}>Hello world!</Button>
        </>
      )}
    </Authenticator>
  )
}

export default App
