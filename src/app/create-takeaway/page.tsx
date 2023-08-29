"use client";

import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { speakers, takeawayIds } from "@/lib/data";
import { cn } from "@/lib/utils";
import { addTakeawaySchema } from "@/server/api/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../_trpc/client";

export default function AddSchedulePage() {
  return (
    <section className="bg-dark-green-default text-cream-default pb-40 min-h-screen">
      <Navigation showNav={true} />

      <div className="pt-20 px-24 flex flex-col items-center xs:px-12">
        <div className="flex max-w-5xl px-14 items-center justify-center gap-8 py-16 flex-col xs:w-full xs:py-8 xs:px-0">
          <h1 className="text-9xl font-reimbrandt xs:text-4xl">Takeaways</h1>
          <div className="text-2xl flex flex-col gap-y-2 xs:text-base">
            <p>“Your word is a lamp to my feet and a light to my path”</p>
            <p>– Psalm 119:105</p>
          </div>
        </div>

        <div className="w-1/2 xs:w-full">
          <AddTakeawayForm />
        </div>
      </div>
    </section>
  );
}

const queryClient = new QueryClient();
function AddTakeawayForm() {
  const addTodo = trpc.takeaways.addTakeaway.useMutation({
    onSuccess: () => queryClient.invalidateQueries(["takeaway"]),
  });

  const router = useRouter();
  // 1. Define form.
  const form = useForm<z.infer<typeof addTakeawaySchema>>({
    resolver: zodResolver(addTakeawaySchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addTakeawaySchema>) {
    console.log(values);
    addTodo.mutate({ ...values, date: values.date.toString() });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8 xs:mt-4">
        <div className="space-y-4">
          <h3 className="font-reimbrandt text-3xl xs:text-2xl">Fellowship Information</h3>
          <section className="grid grid-cols-2 gap-4 xs:text-sm">
            <div className="xs:col-span-2">
              <FormField
                control={form.control}
                name="takeawayId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Fellowship Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fellowship type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {takeawayIds.map((id, index) => (
                            <SelectItem value={id} key={index}>
                              {id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="xs:col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Title</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="xs:col-span-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-md">Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"default"}
                              className={cn(
                                "pl-3 text-left font-normal !text-cream-default",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-1" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="xs:col-span-2">
              <FormField
                control={form.control}
                name="speaker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Speaker</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a speaker for the service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {speakers.map((speaker, index) => (
                            <SelectItem value={speaker} key={index}>
                              {speaker}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="xs:col-span-2">
              <FormField
                control={form.control}
                name="bibleVerse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Bible Verse</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Key points</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none h-48" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="xs:col-span-2 col-span-2">
              <FormField
                control={form.control}
                name="contributors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Contributors</FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
        </div>

        <div className="flex justify-between">
          <Button type="submit" variant={"default"}>
            Add takeaway
          </Button>
          <Button className="flex gap-x-2" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}