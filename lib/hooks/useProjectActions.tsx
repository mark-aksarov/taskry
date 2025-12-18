import { Key } from "react-aria-components";
import { useActionErrorToast } from "./useActionErrorToast";
import { useState, startTransition, useActionState } from "react";
import { ActionFn, UpdateProjectStatusState } from "../actions/types";

export type ModalTextKey = "complete" | "pause" | "resume" | "noTaskChange";

const initialState: UpdateProjectStatusState = {
  status: null,
  message: null,
};

interface UseProjectActionsProps {
  projectIds: number[];
  projectStatus: string;
  updateStatusAction: ActionFn<UpdateProjectStatusState>;
}

export function useProjectActions({
  projectIds,
  projectStatus,
  updateStatusAction,
}: UseProjectActionsProps) {
  // Delete State
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Update Status
  const [
    updateProjectStatusState,
    updateProjectStatusAction,
    updateProjectStatusPending,
  ] = useActionState(updateStatusAction, initialState);

  const [isOpenUpdateStatusModal, setIsOpenUpdateStatusModal] = useState(false);
  const [nextStatus, setNextStatus] = useState<string | null>(null);
  const [modalTextKey, setModalTextKey] =
    useState<ModalTextKey>("noTaskChange");

  useActionErrorToast(updateProjectStatusState);

  const handleAction = (key: Key) => {
    const action = key.toString();

    if (action === "delete") {
      setIsOpenDeleteModal(true);
      return;
    }

    if (projectStatus === action) return;

    // Logic: Completed projects update immediately
    if (projectStatus === "completed") {
      startTransition(() => {
        updateProjectStatusAction({ id: projectIds, nextStatus: action });
      });
      return;
    }

    // Determine Modal Text based on transition
    if (action === "completed") {
      setModalTextKey("complete");
    } else if (projectStatus === "active" && action === "pending") {
      setModalTextKey("pause");
    } else if (projectStatus === "pending" && action === "active") {
      setModalTextKey("resume");
    } else {
      setModalTextKey("noTaskChange");
    }

    setNextStatus(action);
    setIsOpenUpdateStatusModal(true);
  };

  return {
    handleAction,
    deleteModal: {
      isOpen: isOpenDeleteModal,
      setIsOpen: setIsOpenDeleteModal,
    },
    statusModal: {
      isOpen: isOpenUpdateStatusModal,
      setIsOpen: setIsOpenUpdateStatusModal,
      nextStatus,
      modalTextKey,
    },
    updateProjectStatusPending,
  };
}
