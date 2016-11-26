import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';

import { createPost } from '../actions/index';
import { Link, browserHistory } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props).then((res) => {
      // res is the resolved action object with the
      // payload being the 'resolved' promise.

      // Blog post has been created, navigate the user to the index
      // We navigate by calling this.context.router.push with the
      // new path to nvigate to.
      //this.context.router.push('/');
      browserHistory.push('/');
    });
  }
  render() {
    const {
      fields: { title, categories, content},
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type='text' className='form-control' {...title}/>
          <div className='text-help'>
            {
              // Check that the title property has been 'touched' and
              // only display the error if the user touched the field
              // and an error exists for the field.
              // The touched property would be set if the user submits
              title.touched && title.error
            }
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type='text' className='form-control' {...categories}/>
          <div className='text-help'>
            {
              categories.touched && categories.error
            }
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className='form-control' {...content} />
          <div className='text-help'>
            {
              content.touched && content.error
            }
          </div>
        </div>

        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

// Redux-form validation function.
// This validate function will fire on most events for each field in the form
// that was bound to the redux-form.
function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter a Title';
  }
  if(!values.categories) {
    errors.categories = 'Enter a Categories';
  }
  if(!values.content) {
    errors.content = 'Enter a Content';
  }

  // If there are any truthy values assocciated with a key(field name), then it means there is an error.
  return errors;
}

// Connect: first arg is mapStateToProps, 2nd mapDispatchToProps
// redux-form: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate: validate
}, null, { createPost })(PostsNew);
