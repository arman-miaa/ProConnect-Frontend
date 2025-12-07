/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import UserActionDropdown from "./UserActionDropdown";

interface Props {
  users: any[];
  onUpdate: (id: string, payload: any) => Promise<void>;
  currentUserRole: string | null;
}

const UserTable: React.FC<Props> = ({ users, onUpdate, currentUserRole }) => {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full table-auto border-collapse hidden md:table">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2 flex flex-col">
                <span
                  className={`font-medium ${
                    u.is_active === "ACTIVE"
                      ? "text-green-600"
                      : u.is_active === "INACTIVE"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {u.is_active}
                </span>
                <span
                  className={`text-sm ${
                    u.isVerified ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {u.isVerified ? "Verified" : "Unverified"}
                </span>
              </td>
              <td className="px-4 py-2">
                {currentUserRole === "SUPER_ADMIN" ||
                currentUserRole === "ADMIN" ? (
                  <UserActionDropdown user={u} onUpdate={onUpdate} />
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="border rounded p-3 flex flex-col space-y-2 bg-white"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{u.name}</span>
              {currentUserRole === "SUPER_ADMIN" ||
              currentUserRole === "ADMIN" ? (
                <UserActionDropdown user={u} onUpdate={onUpdate} />
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
            <div className="text-sm text-gray-600">{u.email}</div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{u.role}</span>
              <div className="flex flex-col items-end text-right">
                <span
                  className={`${
                    u.is_active === "ACTIVE"
                      ? "text-green-600"
                      : u.is_active === "INACTIVE"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {u.is_active}
                </span>
                <span
                  className={`text-sm ${
                    u.isVerified ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {u.isVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
