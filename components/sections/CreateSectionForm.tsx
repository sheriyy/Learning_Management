"use client";
import { Course, Section } from "@prisma/client";
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
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title required and should be 2 characters long",
  }),
});

const CreateSectionForm = ({
  course,
}: {
  course: Course & { sections: Section[] };
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      label: "Basic Information",
      path: `/instructor/courses/${course.id}/basic`,
    },
    {
      label: "Curriculum",
      path: `/instructor/courses/${course.id}/sections`,
    },
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("random ");
    try {
      const response = await axios.post(
        `/api/courses/${course.id}/sections`,
        values
      );
      router.push(
        `/instructor/courses/${course.id}/sections/${response.data.id}`
      );
      toast.success("New Section successfully created");
    } catch (err) {
      toast.error("Something went wrong");
      console.log("Failed to create a new section", err);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    console.log("hb");
    try {
      await axios.put(`/api/courses/${course.id}/sections/reorder`, {
        list: updateData,
      });
      console.log("ggg", updateData);
      toast.success(" Section successfully reordered");
    } catch (err) {
      console.log("Failed to reorder section", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="px-6 py-4 my-20">
      <div className="flex gap-6">
        {routes.map((route) => (
          <Link key={route.path} href={route.path}>
            <Button
              variant={pathname === route.path ? "default" : "outline"}
              className="text-black hover:bg-black hover:text-white"
            >
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
      <SectionList
        items={course.sections || []}
        onReorder={onReorder}
        onEdit={(id) =>
          router.push(`/instructor/courses/${course.id}/sections/${id}`)
        }
      />
      <h2 className="text-lg font-bold mt-4"> Add new section</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Introduction"
                    {...field}
                    className="text-black"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Link href={`/instructor/courses/${course.id}/basic`}>
              <Button
                variant="outline"
                type="button"
                className="text-black hover:bg-black hover:text-white"
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSectionForm;
