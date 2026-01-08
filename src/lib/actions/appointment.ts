
"use server"

import Appointment from "@/models/Appointment"
export const getAppointments=async()=>{
    try{
    const appointments=await Appointment.find({})
    .populate("userId","firstName lastName email")
    .populate("doctorId","imageUrl name")
    return{
        success:true,
        appointments
    }
    }
    catch(error){
    console.error("Error fetching doctors:", error);
    return { success: false };
    }
}