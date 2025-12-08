/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { SellerServiceCard } from "@/components/services/SellerServiceCard";
import ServiceFormDialog from "@/components/services/ServiceFormDialog";
import {
  getMyServices,
  deleteService,
} from "@/services/service/service.service";
import { Button } from "@/components/ui/button";

interface IService {
  _id: string;
  title: string;
  description: string;
  price: number | string;
  deliveryTime: number | string;
  category: string;
  tags: string[];
  image?: string;
  status?: string;
  [key: string]: any;
}

export default function MyServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);

  useEffect(() => {
    async function fetchServices() {
      const data = await getMyServices();
      // Filter out soft-deleted services
      const filtered = data.filter((s: any) => !s.isDeleted);
      setServices(filtered);
      setLoading(false);
    }
    fetchServices();
  }, []);

  const handleCreate = (newService: IService) => {
    setServices((prev) => [newService, ...prev]);
  };

  const handleUpdate = (updatedService: IService) => {
    setServices((prev) =>
      prev.map((s) => (s._id === updatedService._id ? updatedService : s))
    );
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const success = await deleteService(id);
      if (success) {
        setServices((prev) => prev.filter((s) => s._id !== id));
        Swal.fire("Deleted!", "Service has been deleted.", "success");
      } else {
        Swal.fire("Error", "Failed to delete service.", "error");
      }
    }
  };

  const handleEdit = (service: IService) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  if (loading)
    return <p className="text-center mt-10">Loading your services...</p>;

  return (
    <div className="p-6">
      {/* Create Button */}
      <div className="mb-6 text-right">
        <Button
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
          
        >
          Create Service
        </Button>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <p className="text-center mt-10">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <SellerServiceCard
              key={service._id}
              service={service}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <ServiceFormDialog
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={editingService ? handleUpdate : handleCreate}
        initialData={editingService}
      />
    </div>
  );
}
