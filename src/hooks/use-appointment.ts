"use client";

import { getAppointments } from "@/lib/actions/appointment";
import { useEffect, useState } from "react";


export function useGetAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointments();

      if (data.success) {
        setAppointments(data.appointments || []);
      }

      setLoading(false);
    };

    fetchAppointments();
  }, []);

  return { appointments, loading };
}
