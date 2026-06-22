import { useState } from "react";
import { User, Mail, BriefcaseBusiness, Sparkles , Lock} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {setData} from "../Redux/Feature/NotificationSlice.js"

export default function SignUp() {
  const dispatch=useDispatch()
  const notification=useSelector((store)=>store.Notification.data)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: ""
  });
  
  const [loading ,setLoading] = useState(false)

  const handleAction = async(e) => {
    try {
      e.preventDefault();
      setLoading(true)
  const response = await axios.post("http://localhost:3000/api/signup" , formData , {
    withCredentials : true
  })
  if(response.status == 201) {
    const msg = response.data?.message ?? "Sign up";
    navigate("/Dashbord")
    dispatch(setData(msg))
    setTimeout(() => {
    dispatch(setData(""))
    }, 2000)
  }
  console.log(response)
    }catch(error) {
     console.log(error)
     dispatch(setData("Something went wrong"))
     setTimeout(() => {
     dispatch(setData(""))
     } ,2000)
    }finally{
     setLoading(false)
    }
   };

  return (
    <div className="">

      <div className="">
    <div className="mb-2 text-sm text-gray-300">{notification}</div>
 
      </div>

    <form onSubmit={handleAction} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Operator Identity
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            required
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition duration-150"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Communication Node
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="email"
            required
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition duration-150"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Root Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="password"
            required
            placeholder="Choose security code"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition duration-150"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">
          Business Name
        </label>
        <div className="relative">
          <BriefcaseBusiness className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            required
            placeholder="Company name"
            value={formData.shopName}
            onChange={(e) =>
              setFormData({ ...formData, shopName: e.target.value })
            }
            className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition duration-150"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-black/20"
      >
        <Sparkles className="h-4 w-4 text-zinc-950" />
        <span>{loading ? "Loading..." : "Initialize Deployment"}</span>
      </button>
    </form>

    </div>
  );
}
