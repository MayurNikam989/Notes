import React, { useContext, useState } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

const Home = () => {
  return (
    <div className="container">
      <AddNote />
      <br></br>
      <Notes />
    </div>
  );
};

export default Home;
