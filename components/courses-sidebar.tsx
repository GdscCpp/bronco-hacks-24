"use client";

import { ROUTES } from "@/config/routes";
import { Course } from "@/supabase/helper";
import { createClient } from "@/utils/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursesSidebar() {
  const supabase = createClient();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  const getUser = async () => {
    const { error, data } = await supabase.auth.getUser();
    if (error) {
      router.push(ROUTES.SIGN_IN);
    }

    const user = await supabase
      .from("users")
      .select("*")
      .eq("uuid", data.user?.id!)
      .single();

    return user.data!;
  };

  const getCourses = async () => {
    const user = await getUser();
    const courseIds = user.course_ids;

    if (courseIds && courseIds) {
      const courses = await supabase
        .from("courses")
        .select("*")
        .in("id", courseIds);
      setCourses(courses.data || []);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="w-fit flex h-full bg-primary-900 rounded-xl p-4">
      {courses.map((course) => {
        return (
          <>
            <TooltipProvider key={course.id}>
              <Tooltip>
                <TooltipTrigger
                  className={
                    "bg-primary-400 w-fit h-fit p-5 rounded-xl text-white"
                  }
                >
                  {course.number}
                </TooltipTrigger>
                <TooltipContent className={"text-white"}>{course.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        );
      })}
    </div>
  );
}
