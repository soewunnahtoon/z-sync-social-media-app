"use client";

import EditProfileDialog from "@/components/profile/EditProfileDialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/utils/user-data-select";

interface EditProfileButtonProps {
  user: UserData;
}

const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setShowDialog(true)}>
        Edit profile
      </Button>

      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};
export default EditProfileButton;
