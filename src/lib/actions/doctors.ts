"use server";

import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import { generateAvatar } from "../utils";

export async function getDoctors() {
  try {
    const doctors = await Doctor.find();

    const doctorsWithAppointments = [];

    for (let i = 0; i < doctors.length; i++) {
      const doctor = doctors[i];

      const appointmentCount = await Appointment.countDocuments({
        doctorId: doctor._id,
      });

      // Convert _id and Dates to strings manually
      doctorsWithAppointments.push({
        _id: doctor._id.toString(),
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        speciality: doctor.speciality,
        imageUrl: doctor.imageUrl,
        gender: doctor.gender,
        isActive: doctor.isActive,
        createdAt: doctor.createdAt?.toISOString(),
        updatedAt: doctor.updatedAt?.toISOString(),
        appointmentCount,
      });
    }

    return {
      success: true,
      doctors: doctorsWithAppointments,
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return { success: false };
  }
}

export type CreateDoctorInput = {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: "MALE" | "FEMALE";
  isActive: boolean;
};

export async function createDoctor(input: CreateDoctorInput) {
  try {
    if (!input.name || !input.email) {
      return {
        success: false,
        message: "Name and email are required",
      };
    }

    const existingDoctor = await Doctor.findOne({ email: input.email });
    if (existingDoctor) {
      return {
        success: false,
        message: "Doctor with this email already exists",
      };
    }

    const doctor = new Doctor({
      ...input,
      imageUrl: generateAvatar(input.name, input.gender),
    });

    await doctor.save();

    // Convert to plain object manually
    return {
      success: true,
      doctor: {
        _id: doctor._id.toString(),
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        speciality: doctor.speciality,
        imageUrl: doctor.imageUrl,
        gender: doctor.gender,
        isActive: doctor.isActive,
        createdAt: doctor.createdAt?.toISOString(),
        updatedAt: doctor.updatedAt?.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating doctor:", error);
    return {
      success: false,
      message: "Failed to create doctor",
    };
  }
}


// update the doctor

export type UpdateDoctorInput = {
  name?: string;
  email?: string;
  phone?: string;
  speciality?: string;
  gender?: "MALE" | "FEMALE";
  isActive?: boolean;
};

export const UpdateDoctor = async (id: string, input: UpdateDoctorInput) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      input,
      { new: true }
    );

    if (!updatedDoctor) {
      return {
        success: false,
        message: "Doctor not found",
      };
    }

    return {
      success: true,
      doctor: {
        ...updatedDoctor._doc, // we use doc here because mongoose doc has many fields
        _id: updatedDoctor._id.toString(),
        createdAt: updatedDoctor.createdAt?.toISOString(),
        updatedAt: updatedDoctor.updatedAt?.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error updating doctor:", error);
    return {
      success: false,
      message: "Failed to update doctor",
    };
  }
};
