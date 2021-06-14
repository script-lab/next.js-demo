import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image';

// material-ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const MyDropzone =() => {
  const [imageData, setImageData] = useState([])
  const classes = useStyles();


  const onDrop = useCallback((acceptedFiles) => {
    const filelength = acceptedFiles.length

    if(10 >= filelength > 0) {
      acceptedFiles.forEach((file) => {
        const filereader = new FileReader()
        filereader.onabort = () => alert('ファイルの読み込みを中止しました')
        filereader.onerror = () => alert('ファイルの読み込みに失敗しました')
        filereader.onload = () => {
          setImageData(imageData => [...imageData, filereader.result])
        };
        filereader.readAsDataURL(file)
      })
    } else if(filelength > 10) {
      alert("画像は10枚までです")
      setImageData([])
    } else {
      alert("ファイルが選択されていないか、画像が存在しません")
      setImageData([])
    }
  }, [])


  const {getRootProps, getInputProps} = useDropzone({onDrop})


  const preview = () => {
    console.log(imageData)
    if(imageData.length !== 0) {
      return (
        <>
          <div>
            {imageData.map((image, index) => {
              return (
                <Image src={image} key={index} width={300} height={300}/>
              );
            })}
          </div>
          <button type="button" onClick={() => setImageData([])}>リセットする</button>
        </>
      )
    }
  }


  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} accept="image/*"/>
        <Button variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon/>}>Upload</Button>
      </div>
      {preview()}
    </>
  )
}


export default MyDropzone