import React, {useState,useEffect} from 'react';
import {Link, useNavigate,useParams} from 'react-router-dom';
import { v1 as uuidv1} from 'uuid';
import axios from '../../../config/config'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

function UpdateBook() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [data, setData] = useState([{
    name:'',
    author:'',
    category: '',
    description :''
}]);

useEffect(() => {
   
    const getData = async () => {
      
       await axios.get('/books/' + id)
      .then(res=> {
        setData(res.data.data)
      }
      )
      .catch(error => {console.log(error);})
    };
  getData();
 
  }, [id]);
    
useEffect(() => {
    
    axios.get('/categories')
    .then(res=>{ 
              setLoading(false)
              setPost(res.data)
              setError('')
            }      
    )
    .catch(error =>{
      setLoading(false)
      setPost({})
      setError({error: error.message})
    }
                          
    )
  }, [])

const handleChange = (e)=>{
 
    setData({...data,
      id: uuidv1,
      [e.target.id]: e.target.value
    })
  }

 
  const updateData = async(e)=>{
    e.preventDefault();
    
    await axios.put('books/' +id, 
    {
      title: data.title,
      author: data.author,
      category: data.category,
      description :data.description,
      link : data.link
    }
    )
    .then(response =>{
      navigate ('/admin/books')
      toast.success(response.data.message)
      })
    .catch(error =>{
      toast.error(error.response.data.message)
    })
  }

  return (
    <div>
      <ToastContainer />
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
          
            <form onSubmit={updateData}>
             
              <div className="form-group">
                <div className="d-flex justify-content-between mb-2">
                <label htmlFor="title" className="font-weight-bold">Book</label>
                <Link to="/admin/dashboard" className=" font-weight-bold text-dark "><i className="fa-solid fa-list-check me-3"></i>List of Books</Link>
                </div>
                <input type="text" className="form-control" id="title"  value={data.title} onChange={handleChange}/>
              </div>
              <div className="form-group my-3">
                <label htmlFor="author" className="font-weight-bold">Author</label>
                <input type="text"  className="form-control" id="author" value={data.author} onChange={handleChange}/>
              </div>
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="description" value={data.description} onChange={handleChange} rows="3"></textarea>
              </div>
              <div className='my-4'>
                <label htmlFor="category" className="font-weight-bold">Category</label>
                <select name="category" id="category" value={data.category}  onChange={handleChange}>
                  {
                    loading ? 'loading' : post.map((item)=>
                    <option key={item._id} >{item.name}</option>
                    )
                  }
                  {error ? error : null}
                </select>
              </div>
          
         
              <div className=' '>
              <button  type="submit"   className="btn  btn-dark  font-weight-bold">Update Book</button>
              </div>
              
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default UpdateBook