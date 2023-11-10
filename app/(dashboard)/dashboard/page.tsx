import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CreateNote } from "../_components/CreateNote";
import { CreateNoteDialog } from "../_components/CreateNoteDialog";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <CreateNoteDialog />
    </div>
  );
};

export default Dashboard;
