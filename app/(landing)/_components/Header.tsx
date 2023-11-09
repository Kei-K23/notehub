import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <>
      <h1 className="tracking-wide max-w-4xl text-center text-2xl md:text-4xl xl:text-5xl font-semibold">
        Your <span className="text-sky-500">Thoughts</span>,{" "}
        <span className="text-purple-500">Feelings</span>,{" "}
        <span className="text-orange-500">Documents</span>, &{" "}
        <span className="text-green-500">Goals</span>. Collect in one place with{" "}
        <span className="underline">NoteHub</span>
      </h1>
      <h3 className="max-w-3xl lg:mt-4  tracking-wide text-center font-bold text-xl lg:text-3xl">
        NoteHub is a general note taking web application, collection and
        organize your note
      </h3>
      <Button size={"lg"} className="text-lg">
        Enter NoteHub <ArrowRightIcon className="ml-3" />
      </Button>
    </>
  );
};

export default Header;
