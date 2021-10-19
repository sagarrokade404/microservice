import axios from "axios";
import { useEffect, useState } from "react";
import CreateComment from "../Comments/CreateComment";
import GetAllComments from "../Comments/GetAllComment";

const AllPosts = () => {
  const [posts, setPosts] = useState({});

  const getAllPosts = async () => {
    await axios
      .get("http://localhost:3003/query")
      .then((res) => {
        console.log("getAll post res", Object.values(res.data));
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("get all post error", err);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

      const allPosts =  Object.values(posts).map( post => {
        
       return ( <div className="card col-3 m-1" key={post.id}>
        <div className="card-header">{post.title}</div>
        <div className="card-body">
          <h5 className="card-title">All Comments</h5>
          <GetAllComments comments={post.comment} />
          <CreateComment postId={post.id}/>
        </div>
      </div>)
      });


  return (
    <div className="row">
        {allPosts}
    </div>
  );
};

export default AllPosts;
