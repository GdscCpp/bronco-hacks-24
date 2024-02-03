"use client";
import Annoucement from "@/components/annoucement";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { Annoucements, Course, User } from "@/supabase/helper";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function AnnoucementPlaceholder() {
  const supabase = createClient();
  const router = useRouter();
  const [annoucements, setAnnoucements] = useState<Annoucements[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const paths = useParams();
  const [course, setCourse] = useState<Course | null>(null);

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

    if (user.error) {
      console.error(user.error);
      return;
    }

    setUser(user.data || null);

    return user.data!;
  };

  const getAnnoucements = async () => {
    // TODO: adjust based on the page route later
    const { error, data } = await supabase.from("annoucements").select("*");

    if (error) {
      console.error(error);
      return;
    }

    setAnnoucements(data || []);
    return data!;
  };

  const getCourse = async () => {
    // TODO use the actual course id
    const { error, data } = await supabase
      .from("courses")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error(error);
      return;
    }
    setCourse(data || null);
    return data!;
  };

  useEffect(() => {
    getAnnoucements();
    getUser();
    getCourse();
  });
  return (
    <div className={"w-full bg-primary-900 h-full"}>
      <div className={"w-full inline-flex justify-between"}>
        <Button className="w-10">{"<"}</Button>
        <h1 className={"text-3xl text-white"}>Annoucements</h1>
      </div>

      <div className="divide-y divide-black">
        {annoucements.map((annoucement) => {
          return (
            <>
              <Annoucement
                course={course!}
                annoucement={annoucement}
                user={user!}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
