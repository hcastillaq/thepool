import React from 'react';
import AjaxService  from './../../services/Ajax.service';

export default class NewPost extends React.Component{

  render(){
    return(
      <div>
        <NewPostForm />
      </div>
    )
  }
}

class NewPostForm extends React.Component{
  
  onSubmit(e)
  {
    let formData = new FormData(e.target);
    AjaxService.post('posts/new', formData).then( e => console.log('is heree', e) );
    e.preventDefault();
  }

  render()
  {
    return(
      <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data  ">
        <div>
          <input type="text" placeholder="Titulo" name="title" required />
        </div>
        <div>
          <textarea placeholder="Descripción" name="description" required ></textarea>
        </div>
        <div>
          <input type="file" name="files[]" multiple required />
        </div>
        <div>
          <input type="text" name="tags" placeholder="tags" required />
        </div>
        <div>
          <input type="submit" value="Subir" />
        </div>
      </form>
    )
  }
}