import React, { useState } from "react";
import '../App.css'
import {useForm} from 'react-hook-form'
import { HiMoon } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import Nationality from './nationality.json'
import fail from '../assets/fail.jpg'
import tick from '../assets/tick.jpg'
import loadImg from '../assets/loader.png'
export default function DashBoard() {
    const [theme, settheme] = useState('light')
    const [socialDisp, setSocialDisp] = useState(false)
    const {register, setValue, handleSubmit, formState, getValues} = useForm({
        defaultValues : {
            'name' :'',
            'email' :'',
            'password' :'',
            'gender' :'',
            'nationality' :'',
            'image' :'',
            'profession' :'',
            'description':'',
            'studyLevel' : '',
            'socialGroup' : {
                'X': false,
                'Facebook': false,
                'Pinterest': false,
                'Linked-In': false,
                'YouTube': false,
                'TickTok': false,
                'GitHub': false,
                'Instagram': false,
                'WeChat': false,
                'Telegram': false,
                'Snapchat': false,
                'Reddit': false,
                'Quora': false,
                'Discord': false
            },

        },
        mode : 'onTouched'
    })
    const {errors, isDirty, isValid, isSubmitting} = formState
    const [progError,seterror] = useState(false)
        const [progSuccess,setSuccess] = useState(false)
        const [progLoad, setload] = useState(false)
        const [progSuccessMessage, setprogSuccessMessage] = useState('Successful')
        const [progErrorMessage, setprogErrorMessage] = useState('Error')
        const [progLoadMessage, setprogLoadMessage] = useState('Loading...')

        
        const progressSuccess = {
            display : progSuccess ? 'flex' : 'none'
        }
        const progressError = {
            display : progError ? 'flex' : 'none'
        }
        const progressLoad = {
            display : progLoad ? 'flex' : 'none'
        }
      
        const errorDiv = document.getElementsByName('errorDiv')
        const successDiv = document.getElementsByName('successDiv')
        const loadDiv = document.getElementsByName('loadDiv')
    
        function Showerror(props){
            if(props == 'show'){
               seterror(true)
            }else if(props == 'hide'){
                seterror(false)
            }
        }
        function ShowSuccess(props){
            if(props == 'show'){
                setSuccess(true)
            }else if(props == 'hide'){
                setSuccess(false)
            }
        }
        function ShowLoad(props){
            const loadDiv = document.getElementsByName('loadDiv')
            if(props == 'show'){
                setload(true)
            }else if(props == 'hide'){
                setload(false)
            }
        }

    function ResponseManipulator(props) {
            const errorDiv = document.getElementsByName('errorDiv')

            var jsonResponse = JSON.parse(props)
            if (jsonResponse.exists) {
                setTimeout(() => {
                    ShowLoad('hide')
                    Showerror('show')
                }, 2000);
                setprogErrorMessage('User already exists')
                
                
                setTimeout(() => {
                    Showerror('hide')
                }, 7000);

            }else if (jsonResponse.exists == false){
                setTimeout(() => {
                    ShowLoad('hide')
                }, 2000);
                
                ShowSuccess('show')
                setTimeout(() => {
                    ShowSuccess('hide')
                }, 4000);
            }
        }    
    function SubmitForm(data) {
        
        

        const fetcher = async () => {
            ShowLoad('show')

            fetch('http://127.0.0.1:8000/user/write/', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => ResponseManipulator(data))
        }
       
        fetcher()


    }
    function Themeset(props) {
        if(props == 'light') {
            settheme('dark')
        }else if(props == 'dark'){
            settheme('light')
        }
    }
    function ShowSocial() {
        setSocialDisp((e) => !e)
    }

    const nationalityOption = Nationality.map((Detail, index) => {
        return(
            <option key={index} className=" w-[80%]" id="nationalityOption">{Detail.nationality}</option>
        )
        
    })
    function ImgDecoder(event) {
        
        var imgDis = document.getElementById('ImgDis')
        var pic = document.getElementById('PicUpload').files[0]
        if(pic){
            const render = new FileReader()
            render.onload = function (e) {
                imgDis.src = e.target.result
                setValue('image', e.target.result)
            }
            render.readAsDataURL(pic);
        }
    }

    return (
        <>
        <div className=" w-full sticky top-0 flex align-middle justify-center flex-col">
                <div style={progressError} className="top-0 sticky" name='errorDiv' id="notifier">
                        <img className="w-6 animate-ping p-1.5 sm:w-8 "  src={fail} alt="" />
                    <p className="text-sm font-semibold text-red-500  sm:text-base" id="errorNot">{progErrorMessage}</p>   
                    </div>
                    <div style={progressSuccess} className="top-0 sticky" name='successDiv' id="notifier" > 
                        <img className="w-6 sm:w-8 "  src={tick} alt="" />
                        <p className="bg-black  text-sm sm:text-base rounded-sm top-1 text-green-500 font-bold p-2 mx-auto w-fit">{progSuccessMessage}</p>
                </div>
                    <div style={progressLoad} className="top-0 sticky" name='loadDiv' id="notifier">
                        <img className="w-6 bg-blue-500 p-1 animate-spin sm:w-8 "  src={loadImg} alt="" />
                        <p className="bg-black animate-pulse text-sm sm:text-base rounded-sm top-1 text-blue-500 font-bold p-2 mx-auto w-fit" >{progLoadMessage}</p>
                    </div>
        </div>
        <div id='universalContainer' className={`${theme}`}>
            <div className=" dark:bg-slate-950 w-full flex flex-row justify-around py-2  bg-slate-50" id="themeContainer">
                <span className=" text-slate-900 font-semibold font-serif text-sm italic dark:text-slate-100">Theme :</span>
                {theme == 'light' ? <LuSun onClick={() => Themeset('light')} className=" cursor-pointer animate-spin duration-700 transition-all text-[25px]" /> : <HiMoon className=" cursor-pointer text-slate-900 dark:text-slate-100 text-[20px] animate-pulse transition-all duration-500" onClick={() => Themeset('dark')} /> }
            </div>
            <div className=" bg-slate-50 flex flex-col justify-center dark:bg-slate-950 w-full min-w-full max-w-full min-h-screen">
                <div className=" p-2 w-[85%] border-[1px] shadow-slate-950 dark:shadow-slate-100 shadow-md border-slate-950 dark:border-slate-50 rounded-md  mx-auto my-auto">
                    <form  id="QuestionnaireForm" onSubmit={handleSubmit(SubmitForm)}>
                        <div id="section1">
                            <div className=" dark:text-slate-100" id="in-section1">
                                <img id="ImgDis" className=" cursor-not-allowed rounded-full" src="" alt="profile img" />
                                <input onChange={ImgDecoder} id="PicUpload"  accept=".jpg,.png,.jpeg"  type="file"  />
                            </div>
                            <div id="in-section1">
                                <input  {...register('name', {
                                    required :'name is required',
                                    minLength : {
                                        value : 3,
                                        message : "Enter more characteres"
                                    }
                                })} type="text" placeholder="NAME" name="name" />
                                {errors.name && <p id="errors">{errors.name?.message}</p>}
                            </div>
                            <div id="in-section1">
                                <select {...register('gender', {
                                        required :'gender  is required'
                                    })} type="text"  name="gender" >
                                    <option className=" cursor-not-allowed" disabled selected  value="null">GENDER</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                                <select className=" overflow-hidden" {...register('nationality', {
                                    required :'name is required'
                                })} name="nationality" >
                                    <option className=" cursor-not-allowed" disabled selected value="null">Choose Nationality</option>
                                    {nationalityOption}
                                </select>
                                
                            </div>
                            <div id="in-section1">
                                <input {...register('email', {
                                    required :'email is required',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    }
                                })} type="email" placeholder="EMAIL" name="email"  />
                                {errors.email && <p id="errors">{errors.email?.message}</p>}
                                <input {...register('profession', {
                                        required : 'Type in a profession'
                                    })} name="profession" placeholder="PROFESSION" type="text" />
                                    {errors.profession && <p id="errors">{errors.profession?.message}</p>}
                            </div>
                        </div>
                        
                        <div id="section2">
                        <select {...register('studyLevel',{
                            required :'Please select a level of study. I believe your not Clown'
                        })} name="studyLevel" id="">
                            <option className=" cursor-not-allowed" selected disabled  value="null">EDUCATION LEVEL</option>
                            <option value="certificate ">certificate </option>
                            <option value="Degree">Degree</option>
                            <option value="PHD">PHD</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Professor ">Professor </option>
                        </select>
                        {errors.studyLevel && <p id="errors">{errors.studyLevel?.message}</p>}
                        
                        <div className=" w-full">
                            <span onClick={ShowSocial} className=" dark:bg-slate-50 border-[1px] border-amber-400 rounded-sm flex flex-row justify-between px-1 align-middle w-full"><p className=" text-base text-slate-400 font-bold font-mono my-auto">SOCIALISM</p><p className=" my-auto"><FaAngleDown className=" text-sm" /></p></span>
                            <input className={` mx-auto my-2 ${socialDisp ? ' visible' : ' opacity-0'} grid duration-500 ease-in-out  transition-[opacity] border-none text-slate-400 text-center placeholder:text-center cursor-not-allowed" value="Select Social Group`} placeholder="Select Social Group" />
                            <div  className= {` dark:text-slate-50 ${socialDisp ? 'h-[390px] visible grid' : 'h-[0px] opacity-0 hidden'} grid duration-500 ease-in-out  transition-[height, opacity, grid, hidden]  gap-2 text-sm grid-cols-2 w-full `}>
                            <input onChange={() => setValue('socialGroup.X', !getValues('socialGroup.X'))} type="checkbox" name="X" value={true}  id="" />
                            <label htmlFor="X">X</label>
                            <input onChange={() => setValue('socialGroup.Facebook', !getValues('socialGroup.Facebook'))} type="checkbox" name="Facebook" value='Facebook' />
                            <label htmlFor="Facebook">Facebook</label>
                            <input onChange={() => setValue('socialGroup.Pinterest', !getValues('socialGroup.Pinterest'))} type="checkbox" name="Pinterest" value='Pinterest' />
                            <label htmlFor="Pinterest">Pinterest</label>
                            <input onChange={() => setValue('socialGroup.Linked-In', !getValues('socialGroup.Linked-In'))} type="checkbox" name="Linked-In" value='Linked-In' />
                            <label htmlFor="Linked-In">Linked-In</label>
                            <input onChange={() => setValue('socialGroup.YouTube', !getValues('socialGroup.YouTube'))} type="checkbox" name="YouTube" value='YouTube' />
                            <label htmlFor="YouTube">YouTube</label>
                            <input onChange={() => setValue('socialGroup.TickTok', !getValues('socialGroup.TickTok'))} type="checkbox" name="TickTok" value='TickTok' />
                            <label  htmlFor="TickTok">TickTok</label>
                            <input onChange={() => setValue('socialGroup.GitHub', !getValues('socialGroup.GitHub'))} type="checkbox" name="GitHub" value='GitHub' />
                            <label htmlFor="GitHub">GitHub</label>
                            <input onChange={() => setValue('socialGroup.Instagram', !getValues('socialGroup.Instagram'))} type="checkbox" name="Instagram" value='Instagram' />
                            <label  htmlFor="Instagram">Instagram</label>
                            <input onChange={() => setValue('socialGroup.WeChat', !getValues('socialGroup.WeChat'))} type="checkbox" name="WeChat" value='WeChat' />
                            <label htmlFor="WeChat">WeChat</label>
                            <input onChange={() => setValue('socialGroup.Telegram', !getValues('socialGroup.Telegram'))} type="checkbox" name="Telegram" value='Telegram' />
                            <label htmlFor="Telegram">Telegram</label>
                            <input onChange={() => setValue('socialGroup.Snapchat', !getValues('socialGroup.X'))} type="checkbox" name="Snapchat" value='Snapchat' />
                            <label htmlFor="Snapchat">Snapchat</label>
                            <input onChange={() => setValue('socialGroup.Reddit', !getValues('socialGroup.Reddit'))} type="checkbox" name="Reddit" value='Reddit' />
                            <label htmlFor="Reddit">Reddit</label>
                            <input onChange={() => setValue('socialGroup.Quora', !getValues('socialGroup.Quora'))} type="checkbox" name="Quora" value='Quora' />
                            <label  htmlFor="Quora">Quora</label>
                            <input onChange={() => setValue('socialGroup.Discord', !getValues('socialGroup.X'))} type="checkbox" name="Discord" value='Discord' />
                            <label htmlFor="Discord">Discord</label>
                            </div>
                         </div>

                        {errors.socialGroup && <p id="errors">{errors.socialGroup?.message}</p>}
                        <textarea className=" text-slate-950" placeholder="DESCRIBE YOURSELF" {...register('description', {
                            required : 'Describe yourself please',
                            minLength : {
                                value : 10,
                                message : 'Input more characters'
                            }
                        })} name="description" />
                        {errors.description && <p id="errors">{errors.description?.message}</p>}
                        </div>
                        <button className=" min-w-[80px] p-2 font-semibold hover:bg-gradient-to-br from-purple-500 to-blue-800 hover:text-cyan-400 dark:hover:text-green-300 dark:bg-slate-300 ease-in-out transition-[gradient,color] duration-700 border-[1px]" type="submit">Submit</button>
                        
                    </form>
                </div>
            </div>
        </div>

        </>
    )
}