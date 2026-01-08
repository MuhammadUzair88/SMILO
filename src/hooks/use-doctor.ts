"use client"

import { createDoctor, CreateDoctorInput, getDoctors, UpdateDoctor, UpdateDoctorInput } from "@/lib/actions/doctors"
import { useEffect, useState } from "react"


export function useGetDoctors(){

    const [doctors,setDoctors]=useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchDoctors=async()=>{
            const data=await getDoctors();
            if(data.success){
                setDoctors(data.doctors || []);
                setLoading(false);
            }
        }
         fetchDoctors();
    },[])
return {doctors,loading}

}


export function useCreateDoctor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const create = async (input: CreateDoctorInput) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await createDoctor(input);

      if (!res.success) {
        setError(res.message || "Something went wrong");
        return null;
      }

      setSuccess(true);
      return res.doctor;
    } catch (err) {
      console.error(err);
      setError("Failed to create doctor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createDoctor: create,
    loading,
    error,
    success,
  };
}


export function useUpdateDoctor(){
const [loading,setLoading]=useState(false);
const [error,setError]=useState<string|null>(null);
const [success,setSuccess]=useState(false);

const updateDoctor=async(id:string,input:UpdateDoctorInput)=>{
  try{
    setLoading(true);
    setError(null);
    setSuccess(false);
    const res=await UpdateDoctor(id,input);

  if(!res.success){
      setError(res.message || "Something went wrong ")
      return null;
  }
   setSuccess(true);
   return res.doctor;
  }
  catch (err) {
      console.error(err);
      setError("Something went wrong");
      return null;
    }
    finally {
      setLoading(false);
    }
};
  return {
    updateDoctor:updateDoctor,
    loading,
    error,
    success,
  };

}

