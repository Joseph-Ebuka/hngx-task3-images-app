import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [images, setImages] = useState([]);

  const [search, setSearch] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderdImages = [...images];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedImage] = reorderdImages.splice(sourceIndex, 1);
      reorderdImages.splice(destinationIndex, 0, removedImage);

      return setImages(reorderdImages);
    }else if (type === "group"){
      const reorderdSearches = [...search];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedImage] = reorderdSearches.splice(sourceIndex, 1);
      reorderdSearches.splice(destinationIndex, 0, removedImage);

      return setSearch(reorderdSearches);
    }
  };

  const getPictures = () => {
    fetch(
      "https://api.unsplash.com/photos/?client_id=SMcrsx4CkpwiyQ9dToYuenndE7R9k99unSZU-Q0Aw2I"
    )
      .then((res) => res.json())
      .then((json) => {
        setImages(json);
      })
      .then(() => setSearching(true))
      .catch((err) => console.error(err));
  };
  //console.log(images);

  useEffect(() => {
    getPictures();
  }, []);

  const searcMovie = () => {
    const input = document.getElementById("input");

      if( input.value === " "){
        setSearching(true)
      }else{
        setSearching(false)
      }
    fetch(
      `https://api.unsplash.com/search/photos?query=${input.value}&client_id=SMcrsx4CkpwiyQ9dToYuenndE7R9k99unSZU-Q0Aw2I`
    )
      .then((res) => res.json())
      .then((json) => {
        setSearch(json.results);
      })

      .catch((err) => console.error(err));



  };

  useEffect(() => {
    searcMovie();
  }, []);
  const handleSearch = () => {
    searcMovie();
    setSearching(false);
  };

  useEffect(() => {
 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="navbar">
          <div className="logo">
            <span>Logo</span>
          </div>
          <div className="input">
            <input
              type="search"
              id="input"
              onChange={handleSearch}
              placeholder="Search for images..."
            />
          </div>
          {!user ? (
            <div className="login-signUp">
              <button className="login" onClick={() => navigate("/signin")}>
                Login
              </button>
              <button className="signup" onClick={() => navigate("/signup")}>
                Signup
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => auth.signOut(auth)} className="signout">
                SignOut
              </button>
            </>
          )}
        </div>
        {user ? (
          <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable
              droppableId="ROOT"
              type="group"
              className="imagesSection"
            >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mainWrapper"
                >
                  {searching ? (
                    <>
                      {" "}
                      {images.map((content, index) => {
                        return (
                          <Draggable
                            draggableId={content.id}
                            className="main"
                            key={content.id}
                            index={index}
                          >
                            {(provided) => (
                              <main
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <div className="card">
                                  <div className="image"></div>
                                  <img
                                    src={content.urls.regular}
                                    alt="unsplashImg"
                                  />
                                  <span>{content.alt_description}</span>
                                </div>
                              </main>
                            )}
                          </Draggable>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {" "}
                      {search.map((content, index) => {
                        return (
                          <Draggable
                            draggableId={content.id}
                            className="main"
                            key={content.id}
                            index={index}
                          >
                            {(provided) => (
                              <main
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <div className="card">
                                  <div className="image"></div>
                                  <img
                                    src={content.urls.regular}
                                    alt="unsplashImg"
                                  />
                                  <span>{content.alt_description}</span>
                                </div>
                              </main>
                            )}
                          </Draggable>
                        );
                      })}
                    </>
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <>
            <div className="imagesSection">
              <div className="mainWrapper">
                {searching ? (
                  <>
                    {" "}
                    {images.map((content) => {
                      return (
                        <div className="main" key={content.id}>
                          <main>
                            <div className="card">
                              <div className="image"></div>
                              <img
                                src={content.urls.regular}
                                alt="unsplashImg"
                              />
                              <span>{content.alt_description}</span>
                            </div>
                          </main>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>
                    {" "}
                    {search.map((content, index) => {
                      return (
                        <div className="main">
                          <main>
                            <div className="card">
                              <div className="image"></div>
                              <img
                                src={content.urls.regular}
                                alt="unsplashImg"
                              />
                              <span>{content.alt_description}</span>
                            </div>
                          </main>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
