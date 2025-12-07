
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { IsActiveStatus, UserInfo } from "@/types/user.interface";
import { Camera, Loader2, Save, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface UserProfileData extends UserInfo {
  contactNumber?: string;
  address?: string;
  bio?: string;
  profilePicture?: string;
  skills: string[];
  title: string;
  averageRating: number;
  is_active: IsActiveStatus;
}

interface MyProfileProps {
  userInfo: UserProfileData;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const phone = formData.get("contactNumber") as string;
    if (phone && phone.trim() !== "") {
      const phoneRegex = /^\+?[0-9]{7,15}$/;
      if (!phoneRegex.test(phone)) {
        toast.error("Invalid contact number. Must be 7–15 digits.");
        return;
      }
    }

    startTransition(async () => {
      const result = await updateMyProfile(formData);
      if (result.success) {
        toast.success(result.message || "Profile updated successfully!");
        setPreviewImage(null);
        router.refresh();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your personal information and public profile details
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Picture */}
          <Card className="lg:col-span-1 p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4 pt-2">
              <div className="relative">
                <Avatar className="h-32 w-32 border-2 border-muted">
                  {previewImage || userInfo.profilePicture ? (
                    <AvatarImage
                      src={previewImage || userInfo.profilePicture}
                      alt={userInfo.name}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer shadow hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label>
              </div>

              <div className="text-center space-y-1">
                <p className="font-semibold text-lg">{userInfo.name}</p>
                <p className="text-sm text-muted-foreground">
                  {userInfo.email}
                </p>
                <p className=" text-primary mt-1 capitalize">
                  {userInfo.role.replace("_", " ")}
                </p>
              </div>

              {/* Seller Extra Info */}
              {userInfo.role === "SELLER" && (
                <div className="text-center text-sm space-y-1 mt-3">
                  <p>
                    Account Status:{" "}
                    <span
                      className={`font-medium ${
                        userInfo.is_active === "ACTIVE"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {userInfo.is_active || "Active"}
                    </span>
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    Rating
                    <span className="font-medium">
                      {userInfo.averageRating?.toFixed(1) || 0}
                    </span>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="lg:col-span-2 p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={userInfo.name}
                    required
                    disabled={isPending}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="bg-muted h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    defaultValue={userInfo.contactNumber || ""}
                    disabled={isPending}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={userInfo.address || ""}
                    disabled={isPending}
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seller Extra Info */}
        {userInfo.role === "SELLER" && (
          <Card className="mt-6 p-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Professional Details (Seller Only)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={userInfo.title || ""}
                    placeholder="e.g., Full Stack Developer"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio / About Me</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="resize-none"
                    defaultValue={userInfo.bio || ""}
                    placeholder="Tell clients about your expertise..."
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    defaultValue={userInfo.skills?.join(", ") || ""}
                    placeholder="Web Development, Graphic Design"
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple skills with commas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={isPending} className="px-6 py-2">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
