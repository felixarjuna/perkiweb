"use client";

import { Bed, Music, PersonStanding, Sparkles, Utensils } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import ActionButton from "~/components/action-button";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Separator } from "~/components/ui/separator";
import { useToast } from "~/components/ui/use-toast";

import { dateTimeFormatter, getNextDayOfWeek } from "~/lib/utils";
import { api, type RouterOutputs } from "~/utils/api";
import { groups } from "../group";
import RandomVerse from "./_components/random-verse";

type Schedule = RouterOutputs["schedules"]["getSchedules"][number];
const SUMMARY_MAX_LENGTH = 250;

const verses = [
  'Psalm 133:1 — "How good and pleasant it is when God’s people live together in unity!"',
  '1 Corinthians 12:12 — "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ."',
  'Hebrews 13:16 — "And do not forget to do good and to share with others, for with such sacrifices God is pleased."',
  'Romans 12:10 — "Be devoted to one another in love. Honor one another above yourselves."',
  'Proverbs 27:17 — "As iron sharpens iron, so one person sharpens another."',
  'John 15:12 — "My command is this: Love each other as I have loved you."',
  'Acts 4:32 — "All the believers were one in heart and mind. No one claimed that any of their possessions was their own, but they shared everything they had."',
  'Ecclesiastes 4:9 — "Two are better than one, because they have a good return for their labor."',
  '1 Corinthians 12:12 — "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ."',
];

export default function ScheduleList() {
  const { toast } = useToast();
  const utils = api.useContext();
  const { data: schedules } = api.schedules.getSchedules.useQuery();

  const deleteSchedule = api.schedules.deleteSchedule.useMutation({
    onSuccess: async () => {
      await utils.schedules.invalidate();
      toast({
        title: "Schedule successfully deleted! 🥸",
      });
    },
  });

  const router = useRouter();

  function renderScheduleDetails(schedule: Schedule) {
    return (
      <div className="flex items-center gap-x-2 whitespace-break-spaces font-reimbrandt text-green-400/80 xs:flex-wrap xs:gap-x-1 xs:text-xs">
        <p>{schedule.speaker}</p>
        <span>&middot;</span>
        <p>{schedule.bibleVerse}</p>
        <span>&middot;</span>
        <p>{dateTimeFormatter(schedule.date.toString())}</p>
      </div>
    );
  }

  function renderScheduleSummary(schedule: Schedule) {
    let summary = schedule.summary;
    if (summary.length > SUMMARY_MAX_LENGTH) {
      summary = `${summary.substring(0, SUMMARY_MAX_LENGTH)}...`;
    }

    return <p className="mt-4 xs:text-sm">{summary}</p>;
  }

  function renderScheduleServants(schedule: Schedule) {
    const cookingGroupMembers = groups
      .filter(
        (group) =>
          group.name.toLowerCase() === schedule.cookingGroup?.toLowerCase(),
      )
      .at(0)?.members;

    const cleaningGroupMembers = groups
      .filter(
        (group) =>
          group.name.toLowerCase() === schedule.cleaningGroup?.toLowerCase(),
      )
      .at(0)?.members;

    return (
      <div className="flex flex-col justify-center space-y-2 p-8 xl:w-1/4 2xl:w-1/4 xs:text-sm">
        <div className="flex items-center gap-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-default/60 p-1 xs:h-6 xs:w-6">
            <PersonStanding className="h-5 w-5" />
          </div>
          <p>{schedule.liturgos ?? "-"}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-default/60 p-1 xs:h-6 xs:w-6">
            <Music className="h-4 w-4 xs:h-3 xs:w-3" />
          </div>
          <p>{schedule.musician ?? "-"}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-default/60 p-1 xs:h-6 xs:w-6">
            <Bed className="h-4 w-4 xs:h-3 xs:w-3" />
          </div>
          <p>{schedule.accommodation ?? "-"}</p>
        </div>
        <Drawer>
          <DrawerTrigger>
            <div className="flex items-center gap-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-default/60 p-1 xs:h-6 xs:w-6">
                <Utensils className="h-4 w-4 xs:h-3 xs:w-3" />
              </div>
              <p>{schedule.cookingGroup ?? "-"}</p>
            </div>
          </DrawerTrigger>
          <DrawerContent className="border-0 text-primary-foreground">
            <DrawerHeader>
              <DrawerTitle>{schedule.cookingGroup}</DrawerTitle>
              <DrawerDescription className="flex items-center justify-center gap-2 py-6">
                <div className="flex flex-col gap-4">
                  <RandomVerse items={verses} />

                  <div className="flex items-center justify-center gap-2">
                    {cookingGroupMembers?.map((member, i) => (
                      <div
                        className="w-fit rounded-full bg-primary-foreground px-3 py-1  text-secondary-foreground"
                        key={i}
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-0">
              <Button
                className="w-fit self-center"
                onClick={() => void router.push("/group")}
              >
                See all groups
              </Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger>
            <div className="flex items-center gap-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-default/60 p-1 xs:h-6 xs:w-6">
                <Sparkles className="h-4 w-4 xs:h-3 xs:w-3" />
              </div>
              <p>{schedule.cleaningGroup}</p>
            </div>
          </DrawerTrigger>
          <DrawerContent className="border-0 text-primary-foreground">
            <DrawerHeader>
              <DrawerTitle>{schedule.cleaningGroup}</DrawerTitle>
              <DrawerDescription className="flex items-center justify-center gap-2 py-6">
                <div className="flex flex-col gap-4">
                  <RandomVerse items={verses} />

                  <div className="flex items-center justify-center gap-2">
                    {cleaningGroupMembers?.map((member, i) => (
                      <div
                        className="w-fit rounded-full bg-primary-foreground px-3 py-1  text-secondary-foreground"
                        key={i}
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-0">
              <Button
                className="w-fit self-center"
                onClick={() => void router.push("/group")}
              >
                See all groups
              </Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  function renderMobileActionButton(schedule: Schedule) {
    return (
      <ActionButton
        className="flex w-full place-content-end gap-x-2 px-8 pb-8 xl:hidden 2xl:hidden xs:visible"
        onEditClick={() => void router.push(`/edit-schedule/${schedule.id}`)}
        onDeleteClick={() => deleteSchedule.mutate({ id: schedule.id })}
      />
    );
  }

  function renderDesktopActionButton(schedule: Schedule) {
    return (
      <ActionButton
        className="flex gap-x-2 xs:hidden"
        onEditClick={() => void router.push(`/edit-schedule/${schedule.id}`)}
        onDeleteClick={() => deleteSchedule.mutate({ id: schedule.id })}
      />
    );
  }

  function renderSchedule(schedule: Schedule) {
    return (
      <div
        className="flex h-full gap-y-2 rounded-lg bg-green-default/60
      shadow-lg transition duration-300 hover:bg-green-default/80 xs:flex-col xs:gap-y-0"
      >
        <div className="cursor-pointer p-8 xl:w-3/4 2xl:w-3/4 xs:space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="font-reimbrandt text-2xl tracking-wide">
              {schedule.title}
            </h1>
            {renderDesktopActionButton(schedule)}
          </div>
          {renderScheduleDetails(schedule)}
          {renderScheduleSummary(schedule)}
        </div>

        <Separator
          orientation="vertical"
          className="rounded-lg bg-cream-default xl:my-auto xl:h-48 xl:w-px 2xl:my-auto 2xl:h-48 2xl:w-px xs:mx-auto xs:h-px xs:w-5/6"
        />

        {renderScheduleServants(schedule)}
        {renderMobileActionButton(schedule)}
      </div>
    );
  }

  const thisWeekSchedule = React.useMemo(() => {
    const mondayDate = getNextDayOfWeek(new Date(), 0);
    const saturdayDate = getNextDayOfWeek(new Date(), 6);

    return schedules
      ?.filter(
        (schedule) =>
          schedule.date > mondayDate && schedule.date < saturdayDate,
      )
      .sort((a, b) => {
        if (a.date > b.date) return 1;
        return -1;
      });
  }, [schedules]);

  function renderThisWeekSchedule() {
    if (!thisWeekSchedule) {
      return <p>Loading...</p>;
    }

    return (
      <div className="space-y-4">
        <h1 className="font-reimbrandt text-2xl tracking-wide">This Week</h1>
        {thisWeekSchedule.map((schedule) => renderSchedule(schedule))}
      </div>
    );
  }

  const upcomingSchedules = React.useMemo(() => {
    const saturdayDate = getNextDayOfWeek(new Date(), 6);
    return schedules
      ?.filter((schedule) => schedule.date > saturdayDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [schedules]);

  function renderUpcomingSchedule() {
    if (!upcomingSchedules) return <p>Loading upcoming schedule...</p>;
    return (
      <div className="space-y-4">
        <h1 className="font-reimbrandt text-2xl tracking-wide">
          Upcoming Schedules
        </h1>
        {upcomingSchedules.map((schedule) => renderSchedule(schedule))}
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const previousSchedules = React.useMemo(() => {
    const sundayDate = getNextDayOfWeek(new Date(), 0);
    return schedules?.filter((schedule) => schedule.date < sundayDate);
  }, [schedules]);

  function renderPreviousSchedule() {
    if (!previousSchedules) return <p>Loading previous schedule...</p>;
    return (
      <div className="space-y-4">
        <h1 className="font-reimbrandt text-2xl tracking-wide">
          Previous Schedules
        </h1>
        {previousSchedules.map((schedule) => renderSchedule(schedule))}
      </div>
    );
  }

  return (
    <section className="mt-8 space-y-8">
      {renderThisWeekSchedule()}
      {renderUpcomingSchedule()}
      {renderPreviousSchedule()}
    </section>
  );
}
