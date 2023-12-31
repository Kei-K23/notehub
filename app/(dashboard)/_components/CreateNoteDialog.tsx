"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon, SmileIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import EditorBox from "./EditorBox";
import { useState } from "react";
import toast from "react-hot-toast";
import { NoteType } from "@/services/notes.service";
import { ScrollArea } from "@/components/ui/scroll-area";
import IconPicker from "@/components/icon-picker";

type CreateNoteDialogProps = {
  userId?: string;
  userName?: string;
  saveNoteToDB: ({
    content,
    isPublished,
    title,
    userId,
    icon,
    userName,
  }: NoteType) => Promise<boolean>;
};

export function CreateNoteDialog({
  saveNoteToDB,
  userId,
  userName,
}: CreateNoteDialogProps) {
  const [content, setContent] = useState("");
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handelCreateNewNote = async () => {
    if (content === "") {
      return toast.error("Could not create Note with content");
    }

    const saveNote = await saveNoteToDB({
      content,
      isPublished: false,
      title,
      userId: userId as string,
      icon: emoji,
      userName: userName as string,
    });
    if (saveNote) {
      toast.success("Successfully created new Note");
    } else {
      toast.error("Could not create Note");
    }
    setTitle("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open && content !== "" && title !== "") {
          handelCreateNewNote();
        }

        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Card
          className=" min-w-[250px] min-h-[250px] cursor-pointer hover:shadow-sm hover:shadow-neutral-400"
          title="create new note"
          aria-label="create new note"
        >
          <CardHeader className="text-center">
            <CardTitle className="text-neutral-400 text-2xl">
              Create new Note
            </CardTitle>
            <CardDescription className="text-neutral-400 text-lg">
              Click to create new Note
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <PlusIcon className="text-neutral-400 w-12 h-12" />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-[96%] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1100px]  ">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            <IconPicker onEmojiChange={setEmoji}>
              {emoji ? <h2>{emoji}</h2> : <SmileIcon />}
            </IconPicker>
            <Input
              className="text-2xl md:text-3xl xl:text-4xl  border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:ring-offset-0"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] md:max-h-[600px] xl:max-h-[750px]">
          <EditorBox setContent={setContent} />
        </ScrollArea>
        <DialogFooter>
          <Button
            disabled={title === "" && content == "" ? true : false}
            onClick={async () => {
              handelCreateNewNote();
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
