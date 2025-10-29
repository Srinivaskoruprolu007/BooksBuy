import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

const fetchProfile = async (userId) => {
  const { error, data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
};

const upsertProfile = async (profileData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ ...profileData, id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
};

const uploadAvatar = async (file) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ext = file.name.split(".").pop();
  const fileName = `${user.id}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return `${publicUrl}?v=${Date.now()}`;
};

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["profiles", data.id], data);
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: async (avatarUrl) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Failed updating avatar_url", error);
        return;
      }

      queryClient.setQueryData(["profiles", user.id], data);
    },
  });
};
