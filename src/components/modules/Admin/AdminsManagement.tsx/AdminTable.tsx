/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import ActionDropdown from "./ActionDropdown";

interface Props {
  admins: any[];
  onDelete?: (id: string) => void;
  currentUserRole: string | null;
}

const AdminTable: React.FC<Props> = ({ admins, onDelete, currentUserRole }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto border border-gray-200 divide-y divide-gray-200">
        <thead className="">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
              Email
            </th>

            <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
              Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td className="px-4 py-2 text-sm">{admin.name}</td>
              <td className="px-4 py-2 text-sm">{admin.email}</td>

              <td className="px-4 py-2 text-sm">
                {admin.is_active || "ACTIVE"}
              </td>
              <td className="px-4 py-2 text-sm">
                {currentUserRole === "SUPER_ADMIN" && onDelete ? (
                  <ActionDropdown admin={admin} onDelete={onDelete} />
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
