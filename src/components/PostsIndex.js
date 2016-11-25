import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  render() {
    return (
      <div>
        <div className='text-xs-right'>
          <Link to='/posts/new' className='btn btn-primary'>
            Add a Post
          </Link>
        </div>
        List of Blog Posts
      </div>
    );
  }
  componentWillMount() {
    console.log('componenetWillMount');
    // Get the posts.
    this.props.fetchPosts();
  }
}

/*
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}
*/

function mapStateToProps() {
  return {
    posts: this.props.posts
  };
}
//export default PostsIndex;
export default connect(null, { fetchPosts })(PostsIndex);
