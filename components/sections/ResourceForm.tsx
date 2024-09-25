"use client";
import { Course, Resource, Section } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import SectionList from "@/components/sections/SectionList";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import FileUpload from "@/components/custom/FileUpload";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name required and should be 2 characters long",
  }),
  fileUrl: z.string().min(1, {
    message: "File required!",
  }),
});

interface ResourceFormProps {
  section: Section & { resources: Resource[] };
  courseId: string;
}

const ResourceForm = ({ section, courseId }: ResourceFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fileUrl: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("random ", courseId);
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}/resources`,
        values
      );

      toast.success("New resource successfully uploaded");
      form.reset();
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.log("Failed to upload resource", err);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}/resources/${id}`
      );

      toast.success(" resource successfully deleted");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.log("Failed to delete resource", err);
    }
  };

  return (
    <>
      <div className="flex gap-3 items-center text-lg font-bold mt-10">
        <PlusCircle />
        Add Resources (optional)
      </div>
      <p className="text-sm font-medium mt-3">
        {" "}
        Add Resources to help learning experience better
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {section.resources.map((resource) => (
          <div className="flex justify-between bg-[#0499fd] rounded-lg text-sm p-2">
            <div className="flex items-center">
              <File className="h-4 w-4 mr-5" />
              {resource.name}
            </div>
            <button
              className="text-[#000000]"
              disabled={isSubmitting}
              onClick={() => onDelete(resource.id)}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <X className="h-5 w-5 " />
              )}
            </button>
          </div>
        ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FileName</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Textbook"
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value || ""}
                      onChange={(url) => field.onChange(url)}
                      endpoint="sectionResource"
                      page="Edit section"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ResourceForm;
