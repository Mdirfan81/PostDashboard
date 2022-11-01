import React, { useEffect, useState } from "react";
import {
  editPost,
  getAllPosts,
  deletePost,
  fetchEditPost,
  fetchAllPosts,
  createPost,
} from "../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CreateAndUpdateModal from "./CreateAndUpdateModal";

const Dashboard = ({ open, setOpen, handleCreateClickOpen }) => {
  const [openEdit, setEditOpen] = useState(false);

  const [currentId, setId] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const { title, body } = formData;

  const dispatch = useDispatch();
  const allPosts = useSelector(getAllPosts);

  //-----------------------functions--------------------

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    setOpen(false);
  };

  function handleDelete(e, id) {
    e.preventDefault();
    dispatch(deletePost(id));
  }

  function handleEdit(e, id) {
    e.preventDefault();
    handleEditClickOpen();
    setId(id);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  function handleSubmit(e) {
    e.preventDefault();

    if (title && body) {
      let obj = {
        id: currentId,
        title: title,
        body: body,
      };
      if (e.target.innerHTML.includes("Update")) {
        dispatch(editPost(obj));
      } else {
        dispatch(createPost(obj));
      }

      handleClose();
    } else {
      console.log("Error");
    }
  }
  let renderPost = "";
  renderPost =
    allPosts.length > 1 ? (
      allPosts.map((data, index) => (
        <CardContainer
          key={index}
          id={data.id}
          title={data.title}
          body={data.body}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))
    ) : (
      <div>
        <h1>Loading</h1>
      </div>
    );

  //-----------------------UseEffect--------------------

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <MainContainer>{renderPost}</MainContainer>
      <CreateAndUpdateModal
        handleClickOpen={handleEditClickOpen}
        handleClose={handleClose}
        setFormData={handleChange}
        open={openEdit}
        formName="Edit"
        title={title}
        body={body}
        handleSubmit={handleSubmit}
      />
      <CreateAndUpdateModal
        handleClickOpen={handleCreateClickOpen}
        handleClose={handleClose}
        setFormData={handleChange}
        open={open}
        formName="create"
        title={title}
        body={body}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

function CardContainer({ id, title, body, handleEdit, handleDelete }) {
  return (
    <Card id={id}>
      <CardContent>
        <CustomHeader>{title}</CustomHeader>
        <Typography>{body}</Typography>
      </CardContent>
      <ButtonContainer>
        <IconButton onClick={(e) => handleEdit(e, id)}>
          <EditIcon id={id} />
        </IconButton>
        <IconButton onClick={(e) => handleDelete(e, id)}>
          <DeleteIcon id={id} />
        </IconButton>
      </ButtonContainer>
    </Card>
  );
}

const CustomHeader = styled.h1`
  font-size: 22px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: gray;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ButtonContainer = styled.div`
  /* padding: 10px; */
  /* height: 40px; */
  display: flex;
  gap: 20px;
  float: right;
`;

export default Dashboard;
