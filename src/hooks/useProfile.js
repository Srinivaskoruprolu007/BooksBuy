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
    .from("profile")
    .upsert({ ...profileData, id: user.id })
    .select()
    .single();

  if (error) throw error;
  throw data;
};

const uploadAvatar = async (file) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fileName = `${user.id}/${Date.now()}_${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });
  if (uploadError) throw uploadError;
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl();
  return publicUrl;
};

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", data.id], data);
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
      queryClient.setQueryData(["profile", user.id], (old) => ({
        ...old,
        avatar_url: avatarUrl,
      }));
      supabase.from("profiles").update({ avatar_url: avatarUrl });
    },
  });
};
