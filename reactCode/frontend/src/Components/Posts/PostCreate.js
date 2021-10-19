import axios from 'axios';
import { useState } from 'react';



const PostCreate = () => {

    const [title, setTitle] = useState('');

    const submitNewPost = async (e) => {
        e.preventDefault()
        console.log('post Title', title);
        await axios.post("http://localhost:3001/posts",{ title }).then( res => {
            console.log(res);
        }).catch(err => {
            console.log('error', err)
        })
    }
    return (
        <div className="col-6 pb-5">
            <h2>Create New POST</h2>

            <form onSubmit={submitNewPost}>
                <div className="form-group">
                    <label> Title</label>
                    <input className="form-control" onChange={e => setTitle(e.target.value)}></input>
                </div>
                <button className="btn btn-primary" type="submit"> Submit </button>
            </form>
        </div>
    )
}
export default PostCreate;