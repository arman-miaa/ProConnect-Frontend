/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface Props {
  admin: any;
  onDelete: (id: string) => void;
}

const ActionDropdown: React.FC<Props> = ({ admin, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute coords for portal
  useEffect(() => {
    if (!open || !btnRef.current) return;

    const updateCoords = () => {
      const btnRect = btnRef.current!.getBoundingClientRect();
      const dropdownHeight = dropRef.current?.offsetHeight || 50;

      const spaceBelow = window.innerHeight - btnRect.bottom;
      const willDropUp = spaceBelow < dropdownHeight + 10;

      const top = willDropUp
        ? Math.max(8, btnRect.top - dropdownHeight - 6)
        : Math.min(window.innerHeight - 8, btnRect.bottom + 6);
      const left = Math.min(
        Math.max(8, btnRect.right - 160),
        window.innerWidth - 8
      );

      setDropUp(willDropUp);
      setCoords({ top, left });
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, true);

    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [open]);

  const handleDelete = async () => {
    setOpen(false);
    const result = await Swal.fire({
      title: `Delete admin "${admin.name}"?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await onDelete(admin._id);
        toast.success("Admin deleted successfully!");
        Swal.fire("Deleted!", "Admin has been deleted.", "success");
      } catch (error: any) {
        toast.error(error.message || "Failed to delete admin");
      }
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={() => setOpen((p) => !p)}
        className="p-1 hover:bg-gray-100 cursor-pointer rounded transition-colors duration-200"
      >
        <MoreHorizontal />
      </button>

      {open && coords
        ? createPortal(
            <div
              ref={dropRef}
              data-dropup={dropUp}
              className="fixed w-40 bg-white shadow-md border rounded z-50 animate-scale-in"
              style={{ top: coords.top, left: coords.left }}
            >
              <button
                onClick={handleDelete}
                className="w-full text-left cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-100 transition-colors duration-200"
              >
                Delete
              </button>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

export default ActionDropdown;
