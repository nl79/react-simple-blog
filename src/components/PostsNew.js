import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import { createPost } from '../actions/index';
import { Link, browserHistory } from 'react-router';


const FIELDS = {
  'title': {
    type: 'input',
    label: 'Title For Post'
  },
  'categories': {
    type: 'input',
    label: 'Enter some categories'
  },
  'content': {
    type: 'textarea',
    label: 'Post Contents'
  }
};

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

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];
    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type='text' className='form-control' {...fieldHelper}/>

        <div className='text-help'>
          {
            // Check that the title property has been 'touched' and
            // only display the error if the user touched the field
            // and an error exists for the field.
            // The touched property would be set if the user submits
            fieldHelper.touched && fieldHelper.error
          }
        </div>
      </div>
    )
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>

        {_.map(FIELDS, this.renderField.bind(this))}

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

  _.each(FIELDS, (type, field) => {
    if(!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });
  // If there are any truthy values assocciated with a key(field name), then it means there is an error.
  return errors;
}

// Connect: first arg is mapStateToProps, 2nd mapDispatchToProps
// redux-form: first is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: Object.keys(FIELDS),
  validate: validate
}, null, { createPost })(PostsNew);
