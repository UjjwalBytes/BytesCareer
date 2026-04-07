"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries = [], onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");
  const startDate = watch("startDate");

  const handleAdd = (data) => {
    // ✅ Manual validation (for UX control)
    if (!data.title || !data.organization || !data.startDate) {
      toast.error("Please fill all required fields");
      return;
    }

    // ✅ Description optional only for Education
    if (type !== "Education" && !data.description) {
      toast.error("Description is required");
      return;
    }

    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };

    onChange([...(entries || []), formattedEntry]);

    reset();
    setIsAdding(false);
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const handleImproveDescription = async () => {
    const description = watch("description");

    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(),
    });
  };

  return (
    <div className="space-y-4 bg-white text-black p-4 rounded-xl">

      {/* Existing Entries */}
      <div className="space-y-4">
        {entries.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">
                {item.title} | {item.organization}
              </CardTitle>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-500">
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>

              {/* ❌ Hide description in Education */}
              {type !== "Education" && item.description && (
                <p className="mt-2 text-sm whitespace-pre-wrap">
                  {item.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Entry */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add {type}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">

              <div>
                <Input
                  placeholder={
                    type === "Education"
                      ? "Course (e.g. BCA, MCA)"
                      : "Title"
                  }
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">Title is required</p>
                )}
              </div>

              <div>
                <Input
                  placeholder={
                    type === "Education"
                      ? "College / University"
                      : "Organization"
                  }
                  {...register("organization")}
                />
                {errors.organization && (
                  <p className="text-red-500 text-xs">
                    Organization is required
                  </p>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="month"
                max={new Date().toISOString().slice(0, 7)}
                {...register("startDate")}
              />

              <Input
                type="month"
                min={startDate || undefined}
                {...register("endDate")}
                disabled={current}
              />
            </div>

            <div className="flex gap-2">
              <input type="checkbox" {...register("current")} />
              <label>Current {type}</label>
            </div>

            {/* ✅ Description only for non-education */}
            {type !== "Education" && (
              <>
                <Textarea
                  placeholder="Description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    Description is required
                  </p>
                )}
              </>
            )}

            {/* ❌ Remove AI button for Education */}
            {type !== "Education" && (
              <Button
                type="button"
                variant="outline"
                onClick={handleImproveDescription}
                disabled={isImproving}
              >
                {isImproving ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Improve with AI
                  </>
                )}
              </Button>
            )}
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>

            <Button type="button" onClick={handleSubmit(handleAdd)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}