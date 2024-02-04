"use client";

import { ROUTES } from "@/config/routes";
import { createClient } from "@/utils/supabase/client";
import { Course, Assignment } from "@/supabase/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPencil } from "@fortawesome/free-solid-svg-icons";

export default function couseHome() {
  const supabase = createClient();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

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
      const courses = await supabase.from("courses").select("*");

      setCourses(courses.data || []);
    }
  };

  const getAssignments = async () => {
    const user = await getUser();
    const courseIds = user.course_ids;

    if (courseIds && courseIds) {
      const result = await supabase.from("assignments").select("*");

      if (result.data != null)
        setAssignments(
          result.data.sort(
            (a, b) =>
              moment(a.due_at).utc().valueOf() -
              moment(b.due_at).utc().valueOf()
          ) || []
        );
    }
  };

  useEffect(() => {
    getCourses();
    getAssignments();
  }, []);

  return (
    <>
      <div className="flex-1 justify-start h-ful bg-primary-900 p-[25px] ml-[15px] rounded-xl">
        <h1 className="text-white text-3xl font-bold mb-5">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          {courses.map((course) => {
            return (
              <div
                className="bg-primary-500 h-[250px] rounded-xl flex flex-col justify-end p-4 "
                style={{ backgroundImage: `url(${course.bg_image})` }}
                onClick={() => router.push(`/courses/${course.id}`)}
              >
                <div className="backdrop-blur-sm w-fit p-3 rounded-xl">
                  <h1 className="text-2xl font-black text-white mb-2">
                    {course.title}
                  </h1>
                  <p className="text-white">{course.number}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[400px] ml-[15px] flex flex-col">
        <div className="w-full h-[350px] overflow-y-scroll no-scrollbar mb-[15px] rounded-xl bg-primary-900 p-[25px]">
          <h1 className="text-2xl font-black text-white mb-5">This Week</h1>
          {courses.map((course) => {
            return (
              <div className="mb-2">
                <div className="flex flex-col space-y-[5px] p-0 m-0">
                  <div className="w-full bg-primary-700 h-[10px] p-0 m-0 rounded-[5px]">
                    <div
                      className="bg-secondary-500 h-full rounded-[5px]"
                      style={{ width: "5%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between my-3 text-white">
                  <div>{course.number}</div>
                  <div className="text-gray-500">1/20</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex-1 overflow-y-scroll no-scrollbar rounded-xl bg-primary-900 p-[25px]">
          <h1 className="text-2xl text-secondary-500 mb-5">
            <FontAwesomeIcon icon={faBook} className="mr-2"></FontAwesomeIcon>{" "}
            Due Soon
          </h1>
          {assignments.map((assignment) => {
            if (moment(assignment.due_at).diff(moment(), "days") < 7)
              return (
                <div className="w-full p-3 text-white bg-primary-400 rounded-xl mb-5">
                  <h3 className="font-bold text-lg">{assignment.name}</h3>
                  <p className="text-gray-200">
                    Due {moment(assignment.due_at).format("dddd")} at{" "}
                    {moment(assignment.due_at).format("hh:mm A")} &bull;{" "}
                    {assignment.value} points
                  </p>
                </div>
              );
          })}
          <hr className="mb-5"></hr>
          <h1 className="text-2xl text-secondary-500 mb-5">
            <FontAwesomeIcon icon={faPencil} className="mr-2"></FontAwesomeIcon>{" "}
            To Do
          </h1>
          {assignments.map((assignment) => {
            if (moment(assignment.due_at).diff(moment(), "days") > 7)
              return (
                <div className="w-full p-3 text-white bg-primary-400 rounded-xl mb-5">
                  <h3 className="font-bold text-lg">{assignment.name}</h3>
                  <p className="text-gray-200">
                    Due {moment(assignment.due_at).format("dddd")} at{" "}
                    {moment(assignment.due_at).format("hh:mm A")} &bull;{" "}
                    {assignment.value} points
                  </p>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
}
