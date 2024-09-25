"use client";

import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Course, MuxData, Resource, Section } from "@prisma/client";
import { Button } from "@/components/ui/button";
import RichEditor from "@/components/custom/RichEditor";
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
import { ComboBox } from "../custom/ComboBox";
import FileUpload from "../custom/FileUpload";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Trash } from "lucide-react";
import ResourceForm from "@/components/sections/ResourceForm";
import MuxPlayer from "@mux/mux-player-react";
import Delete from "@/components/custom/Delete";
import PublishButton from "@/components/custom/PublishButton";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title required and should be atleast 2 characters long",
  }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean().optional(),
});

interface EditSectionFormProps {
  section: Section & { resources: Resource[]; muxData?: MuxData | null };
  courseId: string;
  isCompleted: boolean;
}
const EditSectionForm = ({
  section,
  courseId,
  isCompleted,
}: EditSectionFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      description: section.description || "",
      videoUrl: section.videoUrl || "",
      isFree: section.isFree,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/sections/${section.id}`,
        values
      );
      console.log("res", response);
      toast.success("Section successfully updated ");
      router.refresh();
    } catch (err) {
      console.log("Failed in updating  section", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-row gap-3 sm:flex-grow sm:jusytify-between mb-6">
        <Link href={`/instructor/courses/${courseId}/sections`}>
          <Button
            variant="outline"
            className="text-sm font-medium text-black hover:bg-black hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to curriculum
          </Button>
        </Link>
        <div className="flex flex-grow justify-end gap-5">
          <PublishButton
            disabled={!isCompleted}
            courseId={courseId}
            sectionId={section.id}
            isPublished={section.isPublished}
            page="Section"
          />
          <Delete item="section" courseId={courseId} sectionId={section.id} />
        </div>
      </div>
      <h2 className="text-xl font-bold"> Section details</h2>
      <p className="text-sms mt-3">
        Complete section with full information, video and resources for learners
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Intro to fullstack development"
                    {...field}
                    className="text-black "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RichEditor
                    placeholder="What is this section about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {section.videoUrl && (
            <div className="my-4 ">
              <MuxPlayer
                playbackId={section.muxData?.playbackId || ""}
                className="md:max-w-[550px]"
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Video<span className="text-red-400 ">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <FileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="sectionVideo"
                    page="Edit section"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Course Accessibility</FormLabel>
                  <FormDescription>
                    Anyone can access this section for free
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* </div> */}
          <div className="flex gap-4 pb-5">
            <Link href={`/instructor/courses/${courseId}/sections`}>
              <Button
                type="button"
                variant="outline"
                className="text-black hover:bg-black hover:text-white"
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <ResourceForm section={section} courseId={courseId} />
    </>
  );
};

export default EditSectionForm;
