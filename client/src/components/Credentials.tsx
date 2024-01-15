import { useState } from "react"


export default function Credentials() {
    const [nickName, setNickname]= useState<string>('')
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        localStorage.setItem('User-name', nickName)
        console.log(nickName)
    }
  return (
    <div className=' flex bg-[#27414E] h-screen '>
        <form  onSubmit={(e)=> handleSubmit(e)} action="" className='realtive flex flex-col  p-14 m-auto bg-sky-700  w-auto text-slate-400 rounded-md ' >
            <input onChange={(e)=> setNickname(e.target.value)} type="text" required maxLength={20} min={3} id='name' placeholder={"nickname"} className="p-2  rounded-md focus:outline-none" />
            <br />
            <button className=" relative w-16 h-10 rounded-md  text-sky-800 p-1 m-2 bg-[#F3C4F3]"> chat</button>
        </form>

    </div>
  )
}
