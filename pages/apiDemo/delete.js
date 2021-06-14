import axios from 'axios';


const Del = async (id, e) => {

  await axios.delete(`http://localhost:12345/post/${id}`)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
}


export default Del