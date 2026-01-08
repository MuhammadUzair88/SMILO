"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useCreateDoctor } from "@/hooks/use-doctor";


type Gender = "MALE" | "FEMALE";

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialDoctorState = {
  name: "",
  email: "",
  phone: "",
  speciality: "",
  gender: "MALE" as Gender,
  isActive: true,
};

const AddDoctorDialog = ({ isOpen, onClose }: AddDoctorDialogProps) => {
  const [newDoctor, setNewDoctor] = useState(initialDoctorState);

  const { createDoctor, loading, error } = useCreateDoctor();

  const handlePhoneChange = (value: string) => {
    // allow digits only
    setNewDoctor({
      ...newDoctor,
      phone: value.replace(/[^\d]/g, ""),
    });
  };

  const handleSave = async () => {
    const res = await createDoctor(newDoctor);
    if (res) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setNewDoctor(initialDoctorState);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Add a new doctor to your practice.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Name *</Label>
              <Input
                id="new-name"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                placeholder="Dr. John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-speciality">Speciality *</Label>
              <Input
                id="new-speciality"
                value={newDoctor.speciality}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, speciality: e.target.value })
                }
                placeholder="General Dentistry"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-email">Email *</Label>
              <Input
                id="new-email"
                type="email"
                value={newDoctor.email}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, email: e.target.value })
                }
                placeholder="doctor@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-phone">Phone</Label>
              <Input
                id="new-phone"
                value={newDoctor.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="03001234567"
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={newDoctor.gender}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, gender: value as Gender })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({
                    ...newDoctor,
                    isActive: value === "active",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorDialog;
