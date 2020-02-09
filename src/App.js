import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';
import GlobalStyled from './styles/global';

import { Container, Content } from './styles';

import Upload from './components/upload';
import Filelist from './components/FileList';

class App extends Component{
  constructor(props){
super(props)

this.state = {
  uploadsFiles  : []
}
  }

  async componentDidMount(){
    const response = await api.get('posts')
console.log(response.data)
    this.setState({
      uploadsFiles : response.data.map(file=>({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      }))
    })
  }

   handleUpload = files =>{
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    this.setState({
      uploadsFiles : this.state.uploadsFiles.concat(uploadedFiles)});

    uploadedFiles.forEach(this.processUpload);
    console.log(this.state.uploadsFiles)
  }

  updateFile =   (id, data) => {
    this.setState({
      uploadsFiles: this.state.uploadsFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };
  
   processUpload = (uploadedFile)=> {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(
          Math.round((e.loaded * 100) / e.total)
        );
        this.updateFile(uploadedFile.id, {
          progress,
        });
      },
    }).then((res )=>{
      this.updateFile(uploadedFile.id,{
        uploaded : true,
        id : res.data._id,
        url : res.data.url
      })
    }).catch(()=>{
      this.updateFile(uploadedFile.id,{
        error : true
      })
    });
  }

  handleDelete = async id =>{
    await api.delete(`posts/${id}`)

    this.setState({
      uploadsFiles : this.state.uploadsFiles.filter(file => file.id !== id)
    })
  }

  componentWillMount(){
    this.state.uploadsFiles.forEach(file => URL.revokeObjectURL(file.preview))
  }
render(){

  return (
    <Container>
      <Content>
        <Upload onUpload={this.handleUpload} />
        {!!this.state.uploadsFiles.length && <Filelist onDelete={this.handleDelete} files={this.state.uploadsFiles} />}
      </Content>
      <GlobalStyled />
    </Container>
  );
}
}

export default App;
