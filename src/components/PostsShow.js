import React, {Component, PropTypes} from 'react';
import {connect, } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPost, deletePost} from '../actions/index';
import { Link, browserHistory } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('componenetWillMount');
    this.props.fetchPost(this.props.params.id).then(function(res) {
      console.log('fetchPost', res);
      return res;
    });
  }
  onDeleteClick() {
    console.log('Deleting');
    this.props.deletePost(this.props.params.id).then(function(res) {
      console.log('onDeleteClick', res);
      browserHistory.push('/');
      return res;
    });
  }
  render() {
    const {post} = this.props;
    if(!this.props.post) {
      return (<div>Loading....</div>);
    }
    return (
      <div>
        <Link to='/'>Back to Index</Link>
        <button onClick={this.onDeleteClick.bind(this)}
          className='btn btn-danger pull-xs-right'>Delete Post</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}
export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);

