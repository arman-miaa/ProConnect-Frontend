"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface"; // আপনার UserInfo type ঠিক রাখুন
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

// ⚠️ টাইপ এক্সটেনশন: যেহেতু আপনার সার্ভার ডেটা ফ্ল্যাটভাবে পাঠাচ্ছে,
// আমরা ধরে নিচ্ছি বিশেষ ফিল্ডগুলো (address, bio) সরাসরি UserInfo-তেই আছে।
interface UserProfileData extends UserInfo {
  contactNumber?: string;
  address?: string;
  bio?: string;
  currentLocation?: string;
  profilePicture?: string; // ছবিও রুট লেভেলে আছে
}

interface MyProfileProps {
  userInfo: UserProfileData;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ⚠️ যেহেতু সমস্ত ডেটা রুট লেভেলে, getProfilePhoto/getProfileData ফাংশনগুলোর আর প্রয়োজন নেই।

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and public profile details
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* -------------------- ১. প্রোফাইল পিকচার কার্ড -------------------- */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  {/* profilePicture সরাসরি রুট থেকে নেওয়া হচ্ছে */}
                  {previewImage || userInfo.profilePicture ? (
                    <AvatarImage
                      src={previewImage || (userInfo.profilePicture as string)}
                      alt={userInfo.name}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                {/* File Input for Photo Upload */}
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
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

              {/* User Basic Info */}
              <div className="text-center">
                <p className="font-semibold text-lg">{userInfo.name}</p>
                <p className="text-sm text-muted-foreground">
                  {userInfo.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {/* Role Display */}
                  {userInfo.role.replace("_", " ")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* -------------------- ২. ব্যক্তিগত তথ্য কার্ড -------------------- */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error/Success Messages */}
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* কমন ফিল্ড: Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={userInfo.name}
                    required
                    disabled={isPending}
                  />
                </div>

                {/* কমন ফিল্ড: Email (Disabled) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* কমন ফিল্ড: Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    defaultValue={userInfo.contactNumber || ""}
                    required
                    disabled={isPending}
                  />
                </div>

                {/* -------------------- সেলার-নির্দিষ্ট ফিল্ড -------------------- */}
                {/* সেলারের জন্য বিশেষ ফিল্ড (যেমন বায়ো, অ্যাড্রেস) */}
                {userInfo.role === "SELLER" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="currentLocation">Current Location</Label>
                      <Input
                        id="currentLocation"
                        name="currentLocation"
                        defaultValue={userInfo.currentLocation || ""}
                        disabled={isPending}
                        placeholder="e.g., Dhaka, Bangladesh"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        defaultValue={userInfo.address || ""}
                        disabled={isPending}
                        placeholder="Your full address"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio / About Me</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        defaultValue={userInfo.bio || ""}
                        disabled={isPending}
                        placeholder="Tell clients about your expertise and marketplace services..."
                      />
                    </div>
                  </>
                )}

                {/* -------------------- ক্লায়েন্ট-নির্দিষ্ট ফিল্ড -------------------- */}
                {/* ক্লায়েন্টের জন্য বিশেষ ফিল্ড (যেমন ঠিকানা) */}
                {userInfo.role === "CLIENT" && (
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue={userInfo.address || ""}
                      disabled={isPending}
                      placeholder="Your residential address"
                    />
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
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
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
