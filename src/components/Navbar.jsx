import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../provider/AuthContext";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = ()=>{
    logOut()
    .then(()=>{
      console.log('successfully logout user')
    })
    .catch(error=>{
      console.log('faield to LogOut')
    })
  }
    return (
        <div>
            <nav className="sticky top-0 z-50 bg-blue-50 dark:bg-gray-900 shadow-md">
      <section className="mx-auto flex w-11/12 max-w-screen-xl items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/bookCove.png" className="h-8" alt="BookNest Logo" />
          <span className="text-2xl font-semibold">BookCove</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink href="/" className="font-medium text-gray-700 hover:text-blue-500">Home</NavLink>
          <a href="/#" className="font-medium text-gray-700 hover:text-blue-500">About</a>
          <a href="/#" className="font-medium text-gray-700 hover:text-blue-500">Terms & Conditions</a>
        </div>

        {/* Login/Register Buttons */}
        <div className="hidden lg:flex gap-4">
          {
            user ? <>
            <button onClick={handleLogOut} className="border border-blue-500 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600">Log Out</button>
            </> : <>
            <NavLink to="/login"><button className="border border-blue-500 px-4 py-1.5 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">Login</button></NavLink>
            <NavLink to="/register"><button className="border border-blue-500 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600">Register</button></NavLink>
            
            </>
          }
        </div>
      </section>
    </nav>
        </div>
    );
};

export default Navbar;



// import { useContext } from 'react'
// // import logo from '../assets/images/logo.png'
// // import { AuthContext } from '../providers/AuthProvider'
// import { Link } from 'react-router-dom'
// import AuthContext from '../provider/AuthContext'
// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext)
//   return (
//     <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
//       <div className='flex-1'>
//         <Link to='/' className='flex gap-2 items-center'>
//           <img className='w-auto h-7' src={logo} alt='' />
//           <span className='font-bold'>SoloSphere</span>
//         </Link>
//       </div>
//       <div className='flex-none'>
//         <ul className='menu menu-horizontal px-1'>
//           <li>
//             <Link to='/'>Home</Link>
//           </li>
//           <li>
//             <Link to='/jobs'>All Jobs</Link>
//           </li>

//           {!user && (
//             <li>
//               <Link to='/login'>Login</Link>
//             </li>
//           )}
//         </ul>

//         {user && (
//           <div className='dropdown dropdown-end z-50'>
//             <div
//               tabIndex={0}
//               role='button'
//               className='btn btn-ghost btn-circle avatar'
//             >
//               <div title={user?.displayName} className='w-10 rounded-full'>
//                 <img
//                   referrerPolicy='no-referrer'
//                   alt='User Profile Photo'
//                   src={user?.photoURL}
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
//             >
//               <li>
//                 <Link to='/add-job' className='justify-between'>
//                   Add Job
//                 </Link>
//               </li>
//               <li>
//                 <Link to='/my-posted-jobs'>My Posted Jobs</Link>
//               </li>
//               <li>
//                 <Link to='/my-bids'>My Bids</Link>
//               </li>
//               <li>
//                 <Link to='/bid-requests'>Bid Requests</Link>
//               </li>
//               <li className='mt-2'>
//                 <button
//                   onClick={logOut}
//                   className='bg-gray-200 block text-center'
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar
