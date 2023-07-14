import React, { useEffect } from 'react'
import { MainScreen } from '../../components/MainScreen'
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from '../../actions/notesAction';
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import "./MyNotes.css"

const MyNotes = ({ search }) => {

      const navigate = useNavigate();
      const dispatch = useDispatch();
      const noteList = useSelector((state) => state.noteList);
      const { loading, error, notes } = noteList;

      const userLogin = useSelector((state) => state.userLogin);
      const { userInfo } = userLogin;

      const noteCreate = useSelector((state) => state.noteCreate);
      const { sucsses: sucssesCreate } = noteCreate;

      const noteUpdate = useSelector((state) => state.noteUpdate);
      const { sucsses: sucssesUpdate } = noteUpdate;

      const noteDelete = useSelector((state) => state.noteDelete);
      const { loading: loadingDelete, error: errorDelete, sucsses: sucssesDelete } = noteDelete;

      const deletHandler = (id) => {
            if (window.confirm("Are You Sure?")) {
                  dispatch(deleteNoteAction(id));
            }
      };


      console.log(notes)

      useEffect(() => {
            // setTimeout(()=>{
            dispatch(listNotes());
            console.log('userInfo', userInfo)
            // if (!userInfo) {
            //       navigate("/");
            // }
            // },1000*6)
      }, [dispatch, sucssesCreate, navigate, userInfo, sucssesUpdate, sucssesDelete,]);

      return (
            <div className='Main1'>

                  <MainScreen title={`Welcome back ${userInfo?.name}...`} >
                        <Link to="/createnote">
                              <Button style={{ marginLeft: 10, marginBottom: 6 }}>Create New Note</Button>
                        </Link>
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {loading && <Loading />}
                        {errorDelete && (
                              <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
                        )}
                        {loadingDelete && <Loading />}

                        {notes?.reverse().filter((filteredNote) =>
                              filteredNote.title.toLowerCase().includes(search.toLowerCase())
                        ).map((note) => (



                              <Card key={note._id} style={{marginBottom:20}}>
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
                                                      Created On :{note.createdAt.substring(0, 10)}
                                                </footer>
                                          </blockquote>
                                    </Card.Body>

                              </Card>
                        ))}

                  </MainScreen>
            </div>
      )
}

export default MyNotes