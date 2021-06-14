import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import React, { useContext } from 'react'
import { TopContext } from './index'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  input: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Update = () => {

  const post = useContext(TopContext)
  const classes = useStyles();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({criteriaMode: "all"});


  const onSubmit = async (data, e) => {
    e.preventDefault()
    await axios.put(`http://localhost:12345/post/${post.id}`, {
      // post: data
      title: data.title,
      content: data.content
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.input} noValidate autoComplete="off">
      <TextField {...register("title", {
        validate: value => value === "" ? '入力が必須な項目です': console.log("success")
        })} type="text" name="title" defaultValue={post.title} id="standard-basic" label="type a title" />
        <ErrorMessage
          errors={errors}
          name="title"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />

      <TextField {...register("content", {
        validate: value => value === "" ? '入力が必須な項目です': console.log("success")
        })} type="text" name="content" defaultValue={post.content} id="standard-basic" label="type a content" />
        <ErrorMessage
          errors={errors}
          name="content"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />

      <Button type="submit" variant="contained" color="primary" disabled={isDirty === false}>submit</Button>
    </form>
  )
}


export default Update