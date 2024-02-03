import { Annoucements, Course, User } from "@/supabase/helper";
import { createClient } from "@/utils/supabase/client";
import moment from "moment";

interface AnnoucementProps {
  annoucement: Annoucements;
  user: User;
  course: Course;
}

export default function Annoucement({
  annoucement,
  user,
  course,
}: AnnoucementProps) {
  return (
    <>
      <div className={"w-full flex flex-col whitespace-nowrap"}>
        <div className="inline-flex m-10">
          <img
            src={"http://placeholder.co/"}
            className={"w-10 h-10 rounded-full mr-10"}
          />
          <div>
            <h1 className={"text-white"}>
              {user.first_name} {user.last_name}
            </h1>
            <span className="text-black font-thin whitespace-nowrap">
              <p>
                {course.number} - {moment(annoucement.created_at).format("ll")}
              </p>
            </span>
            <p className="text-white">{annoucement.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
