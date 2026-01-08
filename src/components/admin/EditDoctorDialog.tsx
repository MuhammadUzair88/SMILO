"use client";

import { useState, useEffect } from "react";
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
import { useUpdateDoctor } from "@/hooks/use-doctor";


type Gender = "MALE" | "FEMALE";

type Doctor = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
};

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

const EditDoctorDialog = ({ doctor, isOpen, onClose }: EditDoctorDialogProps) => {
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor);

  const { updateDoctor, loading, error } = useUpdateDoctor();

  // Update local state whenever a new doctor is selected
  useEffect(() => {
    setEditingDoctor(doctor);
  }, [doctor]);

  if (!editingDoctor) return null;

  const handlePhoneChange = (value: string) => {
    setEditingDoctor({
      ...editingDoctor,
      phone: value.replace(/[^\d]/g, ""),
    });
  };

  const handleSave = async () => {
    if (!editingDoctor) return;
    const res = await updateDoctor(editingDoctor._id, editingDoctor);
    if (res) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setEditingDoctor(doctor); // reset to original doctor
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>Edit the information of the doctor.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={editingDoctor.name}
                onChange={(e) =>
                  setEditingDoctor({ ...editingDoctor, name: e.target.value })
                }
                placeholder="Dr. John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-speciality">Speciality *</Label>
              <Input
                id="edit-speciality"
                value={editingDoctor.speciality}
                onChange={(e) =>
                  setEditingDoctor({ ...editingDoctor, speciality: e.target.value })
                }
                placeholder="General Dentistry"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={editingDoctor.email}
                onChange={(e) =>
                  setEditingDoctor({ ...editingDoctor, email: e.target.value })
                }
                placeholder="doctor@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={editingDoctor.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="03001234567"
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={editingDoctor.gender}
                onValueChange={(value) =>
                  setEditingDoctor({ ...editingDoctor, gender: value as Gender })
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
                value={editingDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setEditingDoctor({
                    ...editingDoctor,
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDoctorDialog;
