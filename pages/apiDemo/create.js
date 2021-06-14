import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Create = () => {

  const classes = useStyles();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({criteriaMode: "all"});


  const onSubmit = async (data, e) => {
    e.preventDefault()
    await axios.post('http://localhost:12345/post', {
      title: data.title,
      content: data.content
    })
    .then(result => {
      console.log(result);
      reset();
    })
    .catch(error => {
      console.log(error);
      reset();
    });
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate autoComplete="off">
      <TextField {...register("title", {
        required: "タイトルを入力してください",
        pattern: {
          value: /\w+/,
          message: "日本語は使用できません"
        },
        maxLength: {
          value: 30,
          message: "入力は30文字以内です"
        },
        })} type="text" name="title" defaultValue="" id="standard-basic" label="type a title" />
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
        required: "内容を入力してください",
        pattern: {
          value: /\w+/,
          message: "日本語は使用できません"
        },
        maxLength: {
          value: 100,
          message: "入力は100文字以内です"
        },
        })} type="text" name="content" defaultValue="" id="standard-basic" label="type a content" />
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

      <Button type="submit" variant="contained" color="primary">submit</Button>
    </form>
  )
}


export default Create