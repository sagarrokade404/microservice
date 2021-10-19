const GetAllComments= ({comments}) => {

  const allComments = comments.length > 0 && comments.map(comment => {

    let newComment = '';
    if(comment.status === 'approved') {
      newComment = comment.content;
    }
    if(comment.status === 'pending') {
      newComment = 'The comment is awaiting modaration';
    }
    if(comment.status === 'rejected') {
      newComment = 'this comment is rejected';
    }
        return(
            <li className="card-text" key={comment.id}>
          {newComment}
          </li>
        )
    })
    return(
        <div className="pb-3">
           <ul>
           {allComments}
           </ul>
        </div>
    )
};

export default GetAllComments;