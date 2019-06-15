import React from 'react';
import AjaxService  from './../../services/ajax.service';

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
<<<<<<< HEAD:src/pages/posts/NewPost.js
    ajax.post('posts/new', formData).subscribe( e => console.log('is heree', e) );
=======
    AjaxService.post('posts/new', formData).subscribe( e => console.log('is heree', e) );
>>>>>>> cb754a8544aaaa2cd77aea9b7cabbd3797c28016:src/pages/posts/NewPost.tsx
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