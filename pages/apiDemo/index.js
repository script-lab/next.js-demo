// component
import Create from "./create"
import Del from "./delete"
import Update from "./update"

// hooks
import useSWR from 'swr';
import React, {useState, createContext} from 'react';
export const TopContext = createContext()

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(30),
      height: theme.spacing(25),
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  window: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const fetcher = (...args) => fetch(...args).then(response => response.json());


const Index = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const { data, error } = useSWR(
    'http://localhost:12345/posts',
    fetcher,
    { initialData: props.data, refreshInterval: 500 }
  );
  if (error) {
    console.error(error);
    return <div>エラーが発生しました。コンソールを確認してください。</div>
  }
  if (!data) {
    return <div>読み込み中...</div>
  }


  return (
    <>
      <Create></Create>
      {
        data.map((post, index) => (
          <div key={index} className={classes.paper}>
            <Paper elevation={3}>
              <p>id: {post.id}</p>
              <p>title: {post.title}</p>
              <p>content: {post.content}</p>
              <button type="button" className="btn btn-primary" onClick={e => {handleOpen(); setPostData(post)}}>edit</button>
              <button type="button" className="btn btn-danger" onClick={e => Del(post.id, e)}>Delete</button>
            </Paper>
          </div>
        ))
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.window}>
            <h2 id="transition-modal-title">Edit post</h2>
            <TopContext.Provider value={postData}>
              <Update ></Update>
            </TopContext.Provider>
          </div>
        </Fade>
      </Modal>
    </>
  )
}


// SSR
export async function getServerSideProps() {
  const res = await fetch("http://localhost:12345/posts");
  const data = await res.json();
  return { props: { data } }
}


export default Index