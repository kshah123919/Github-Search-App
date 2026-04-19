import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [search, setSearch] = useState("")
 const [user,setUser]=useState(null)
 const[loading,setLoading]=useState(false)
 const [error,setError]=useState("")

 const fetchUser=()=>{

if(search==="") return ;
setLoading(true)
setError("")
 const url="https://api.github.com/users/"+search
 fetch(url)
 .then(res=>{
  if(!res.ok){
    throw new Error("User not found")
  }
  return res.json()
 })
 .then(data=>{
  setUser(data)
  setLoading(false)
 })
 .catch(()=>{
  setError("User not found")
  setUser(null)
  setLoading(false)
   })
 }



  return (
    
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-800 to-purple-900 text-white'>
    <div className='bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-96 flex flex-col items-center gap-5 shadow-xl'>
      
      

        <h2 className='text-2xl font-bold mb-3'>Github search app</h2>

        <input
          className='border p-2 rounded-md w-64 text-black'
          placeholder='Search user..'
          onChange={(event)=>{
            setSearch(event.target.value)
          }}
        />
         <button className='bg-white text-black px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300 active:scale-95 ' onClick={fetchUser}>Search</button>
        <p>You Typed : {search}</p>


         {loading && <p>Loading...</p>}
    
       
       {error&& <p className='text-red-500'>{error}</p>}
    
    {user && !loading && (
      <div className='flex items-center gap-4 p-4 m-3 border rounded-xl shadow-md w-80'>
        <img src={user.avatar_url}
        alt='user'
        className='w-16 h-16 rounded-full'
        />
        <div>
          <p className='font-semibold text-lg'>{user.name}</p>
        <p className='text-sm text-gray-500'>{user.login}</p>
        <p className='text-sm'>Followers :{user.followers}</p>
        <p className='text-sm'>Repos :{user.public_repos}</p>
        <a  className='text-sm ' href={user.html_url} target="_blank" rel='noopener noreferrer'>View Profile </a>
        </div>
    

     
      </div>
      )}
      </div>
  </div>
  )
}

export default App
