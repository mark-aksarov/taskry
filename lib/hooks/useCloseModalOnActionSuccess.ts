import { useEffect } from "react";
import { ActionState } from "../actions/types";

export function useCloseModalOnActionSuccess(
  state: ActionState,
  setIsModalOpen: (isOpen: boolean) => void,
) {
  useEffect(() => {
    if (state.status === "success") {
      setIsModalOpen(false);
    }
  }, [state, setIsModalOpen]);
}
