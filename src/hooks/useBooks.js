import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

const fetchBooks = async () => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
};

const createBook = async (bookData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("books")
    .insert({ ...bookData, created_by: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
};

const updateBook = async ({ id, ...bookData }) => {
  const { data, error } = await supabase
    .from("books")
    .update(bookData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const deleteBook = async (id) => {
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) throw error;
};

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
