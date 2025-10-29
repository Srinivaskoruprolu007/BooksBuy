import {
  useProfile,
  useUpdateProfile,
  useUploadAvatar,
} from "../hooks/useProfile";
import { useAuthStore } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../schemas/profileSchema";

const Profile = () => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useProfile(user?.id);

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();

  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset(profile);
      setAvatarPreview(profile.avatar_url);
    }
  }, [profile, reset]);

  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      uploadAvatar(file);
    }
  };

  const onSubmit = (data) => {
    updateProfile(data);
  };

  if (isLoading)
    return <div className="text-center py-10">Loading Profile...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          <img
            src={avatarPreview || profile?.avatar_url}
            alt="avatar"
            className="size-24 rounded-full object-cover"
          />
          <label className="absolute right-0 bottom-0 bg-indigo-600 text-white p-1 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
              className="hidden"
            />
            {isUploading ? "Uploading..." : "Edit"}
          </label>
        </div>
        <p className="text-gray-600">{user?.email}</p>
        <p>Role: {profile?.user_role || "user"} </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            {...register("username")}
            className="w-full p-2 border rounded"
            defaultValue={profile?.username}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={isUpdating}
          type="submit"
        >
          {isUpdating ? "Saving" : "Save Chnages"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
