import React, { useEffect, useState } from 'react'
import { MainScreen } from '../../components/MainScreen'
import { Link } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';

import axios from "axios";

const MyNotes = () => {

      const [notes,setNodes]=useState([]);

      const deletHandler = (id) => {
            if (window.confirm("Are You Sure?")) {

            }
      };
      const fechNodes = async () => {
            const {data} = await axios.get('/api/notes');
            setNodes(data);
            
      }
      console.log(notes)
      useEffect(() => {
            fechNodes();
      }, [])

      return (
            <div className=''>

                  <MainScreen title="Welcome back Omar" >
                        <Link to="/createnote">
                              <Button style={{ marginLeft: 10, marginBottom: 6 }}>Create New Note</Button>

                              {notes.map((note) => (



                                    <Card key={note._id}>
                                          <Card.Header style={{ display: "flex" }}>
                                                <span style={{
                                                      color: "black",
                                                      textDecoration: "none",
                                                      flex: 1,
                                                      cursor: "pointer",
                                                      alignSelf: "center",
                                                      fontSize: 18,
                                                }}>
                                                      {note.title}
                                                </span>
                                                <div>
                                                      <Button href={`/note/${note._id}`} >Edit</Button>
                                                      <Button variant='danger' className='mx-2' onClick={() => deletHandler(note._id)}>Delete</Button>

                                                </div>
                                          </Card.Header>
                                          <Card.Body>
                                                <h4 variant="sucsses">
                                                      <Badge >
                                                            Category - {note.category}
                                                      </Badge>
                                                </h4>
                                                <blockquote className="blockquote mb-0">
                                                      <p>
                                                            {note.content}
                                                      </p>
                                                      <footer className="blockquote-footer">
                                                            Created On - Date
                                                      </footer>
                                                </blockquote>
                                          </Card.Body>

                                    </Card>
                              ))}
                        </Link>
                  </MainScreen>
            </div>
      )
}

export default MyNotes