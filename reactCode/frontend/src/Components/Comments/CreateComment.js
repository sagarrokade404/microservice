import axios from "axios";
import { useState } from "react"

const CreateComment = ({postId}) => {

    const [content, setcontent] = useState('');

    const newComment = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:3002/posts/${postId}/comments`,{content}).then( res => {
            console.log('new comment ', res);
        }).catch(err => {
            console.log('new comment ', err);
        })
    }
    return (
        <div className="col-11 p-1">
        <h5>write new comment</h5>

        <form onSubmit={newComment}>
            <div className="form-group">
                <label> comment </label>
                <input className="form-control" onChange={e => setcontent(e.target.value)}></input>
            </div>
            <button className="btn btn-primary mt-1" type="submit"> Submit </button>
        </form>
    </div>
    )
};

export default CreateComment;