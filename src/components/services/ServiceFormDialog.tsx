/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  createService,
  updateService,
} from "@/services/service/service.service";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IServiceFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (service: any) => void;
  initialData: any | null;
}

const ServiceFormDialog = ({
  open,
  onClose,
  onSuccess,
  initialData,
}: IServiceFormDialogProps) => {
  const isEditing = !!initialData;

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Controlled states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  // Server action
  const action = isEditing
    ? updateService.bind(null, initialData._id)
    : createService;

  const [state, formAction, isPending] = useActionState(action, null);
  const prevStateRef = useRef(state);

  
    useEffect(() => {
      if (state && !state.success && state.message) {
        toast.error(state.message);
      }
    }, [state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialData) {
      setStatus(initialData.status || "");
    } else {
      setStatus("");
    }
  }, [initialData, open]);

  // Populate form on edit
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price?.toString() || "");
      setDeliveryTime(initialData.deliveryTime?.toString() || "");
      setCategory(initialData.category || "");
      setTags(initialData.tags?.join(", ") || "");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      // Reset for creation
      setTitle("");
      setDescription("");
      setPrice("");
      setDeliveryTime("");
      setCategory("");
      setTags("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [initialData, open]);

  // Handle state changes (success / error)
  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(
        `Service ${isEditing ? "updated" : "created"} successfully!`
      );
      onSuccess(state.data);
      handleClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);

      // Restore file input if error
      if (selectedFile && fileInputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(selectedFile);
        fileInputRef.current.files = dt.files;
      }
    }
  }, [state, isEditing, onSuccess, selectedFile]);

  const handleClose = () => {
    setSelectedFile(null);
    if (formRef.current) formRef.current.reset();
    onClose();
  };

  // Display image preview
  const displayImageUrl = selectedFile
    ? URL.createObjectURL(selectedFile)
    : isEditing && initialData?.image
    ? initialData.image
    : null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEditing ? "Edit Service" : "Create New Service"}
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Service Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Custom MERN Dashboard Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <InputFieldError field="title" state={state} />
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <select
                id="status"
                name="status"
                className="border rounded px-3 py-2 w-full dark:bg-slate-900 dark:border-slate-700"
                value={status || ""}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="LIVE">LIVE</option>
                <option value="DRAFT">DRAFT</option>
                <option value="PAUSED">PAUSED</option>
              </select>
              <InputFieldError field="status" state={state} />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                placeholder="Service description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputFieldError field="description" state={state} />
            </Field>

            {/* Category */}
            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <select
                id="category"
                name="category"
                className="border rounded px-3 py-2 w-full dark:bg-slate-900 dark:border-slate-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Software Testing">Software Testing</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Data Science & AI">Data Science & AI</option>
              </select>
              <InputFieldError field="category" state={state} />
            </Field>

            {/* Price */}
            <Field>
              <FieldLabel htmlFor="price">Price ($)</FieldLabel>
              <Input
                id="price"
                name="price"
                placeholder="450"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <InputFieldError field="price" state={state} />
            </Field>

            {/* Delivery Time */}
            <Field>
              <FieldLabel htmlFor="deliveryTime">
                Delivery Time (days)
              </FieldLabel>
              <Input
                id="deliveryTime"
                name="deliveryTime"
                placeholder="10"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
              <InputFieldError field="deliveryTime" state={state} />
            </Field>

            {/* Tags */}
            <Field>
              <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
              <Input
                id="tags"
                name="tags"
                placeholder="mern, dashboard, fullstack"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <InputFieldError field="tags" state={state} />
            </Field>

            {/* Image */}
            <Field>
              <FieldLabel htmlFor="image">Service Image</FieldLabel>
              {displayImageUrl && (
                <div className="mb-2">
                  <Image
                    src={displayImageUrl}
                    alt="Service Preview"
                    width={200}
                    height={150}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <Input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
             
              />
              <InputFieldError field="image" state={state} />
            </Field>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 dark:bg-slate-800 dark:border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Service"
                : "Create Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
