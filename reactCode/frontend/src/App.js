import './App.css';
import AllPosts from './Components/Posts/AllPosts';
import PostCreate from './Components/Posts/PostCreate';

function App() {
  return (
    <div className="container">
      <PostCreate />

      <AllPosts />
    </div>
  );
}

export default App;
