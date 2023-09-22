import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
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
    } else if (type === "group") {
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
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
  };
  //console.log(images);

  useEffect(() => {
    getPictures();
  }, []);

  const searcMovie = () => {
    const input = document.getElementById("input");

    fetch(
      `https://api.unsplash.com/search/photos?query=${input.value}&client_id=SMcrsx4CkpwiyQ9dToYuenndE7R9k99unSZU-Q0Aw2I`
    )
      .then((res) => res.json())
      .then((json) => {
        setSearch(json.results);
      })
      .then(() => setLoading(false))
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

  const showFirstletter = () => {
    if (user && user.email) {
      const letter = user.email[0].toUpperCase();
      return <>{letter}</>;
    } else {
      return;
    }
  };
  showFirstletter();

  const handleSignout = () => {
    const userConfirms = window.confirm("Are you sure u want to sign out?");
    if (userConfirms) {
      auth.signOut(auth);
    } else {
      return <>continue dragging and dropping</>;
    }
  };
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="navbar">
          <div className="logo">
            <span>Logo</span>
          </div>
          <div className="input">
            <form action="">
              <input
                type="search"
                id="input"
                onChange={handleSearch}
                placeholder="Search for images..."
              />
            </form>
          </div>
          {!user ? (
            <div className="login-signUp">
              <button className="login" onClick={() => navigate("/signin")}>
                Login
              </button>
              <button className="signup" onClick={() => navigate("/signup")}>
                Signup
              </button>
              <></>
            </div>
          ) : (
            <>
              <button onClick={handleSignout} className="signout">
                SignOut
              </button>
              <span
                style={{
                  backgroundColor: "#0a4d6e",
                  padding: "5px",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {" "}
                {showFirstletter()}
              </span>
            </>
          )}
        </div>
        {loading && <Loader/>}
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
                          <>
                          {loading && <Loader/>}
                            {loading ? (
                              <Loader />
                            ) : (
                              <Draggable
                                draggableId={content.id}
                                className="main"
                                key={content.id}
                                index={index}
                              >
                                {(provided) => (
                                  <>
                                  {loading && <Loader/>}
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
                                  </>
                                )}
                              </Draggable>
                            )}
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {" "}
                      {search.map((content, index) => {
                        return (
                          <>
                            {loading ? (
                              <Loader />
                            ) : (
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
                                    {loading && <Loader/>}
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
                            )}
                          </>
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
                        <>
                          {loading ? (
                            <Loader />
                          ) : (
                            <div className="main" key={content.id}>
                              <main>
                                <div className="card">
                                  {loading && <Loader/>}
                                  <div className="image"></div>
                                  <img
                                    src={content.urls.regular}
                                    alt="unsplashImg"
                                  />
                                  <span>{content.alt_description}</span>
                                </div>
                              </main>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <div>
                    {" "}
                    {search.map((content, index) => {
                      return (
                        <>
                          {loaing ? (
                            <Loader />
                          ) : (
                            <div className="main">
                              <main>
                                <div className="card">
                                  {loading && <Loader/>}
                                  <div className="image"></div>
                                  <img
                                    src={content.urls.regular}
                                    alt="unsplashImg"
                                  />
                                  <span>{content.alt_description}</span>
                                </div>
                              </main>
                            </div>
                          )}
                        </>
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
