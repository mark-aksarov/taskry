"use client";

import {
  FileDropItem,
  FileTrigger,
  DropZone as RACDropZone,
  DropZoneProps as RACDropZoneProps,
  Button,
} from "react-aria-components";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";
import { CloudUpload } from "lucide-react";

interface DropZoneOwnProps {
  onFilesSelect: (files: FileList) => void;
}

type DropZoneProps = DropZoneOwnProps & RACDropZoneProps;

const styles = tv({
  base: "flex flex-col items-center justify-center gap-3 rounded-xl p-8",
  variants: {
    isDropTarget: {
      true: "bg-gray-100 dark:bg-gray-700",
    },
  },
});

export function DropZone({ onFilesSelect, ...props }: DropZoneProps) {
  return (
    <div className="bg-dashed-border bg-clip-padding p-px">
      <RACDropZone
        {...props}
        className={(renderProps) =>
          styles({
            ...renderProps,
          })
        }
        onDrop={async (e) => {
          const filePromises: Promise<File>[] = [];

          for (const item of e.items) {
            if (item.kind === "file") {
              const file = (item as FileDropItem).getFile();
              filePromises.push(file);
            }
          }

          const files = await Promise.all(filePromises);
          const fileList = new DataTransfer();

          files.forEach((file) => fileList.items.add(file));
          onFilesSelect(fileList.files);
        }}
      >
        <CloudUpload
          size={36}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="text-black dark:text-white"
        />

        <div className="flex flex-col items-center justify-center gap-1">
          <FileTrigger
            allowsMultiple
            onSelect={(files) => {
              if (files) onFilesSelect(files);
            }}
          >
            <Button
              className={(renderProps) =>
                focusRing({
                  ...renderProps,
                  className:
                    "cursor-pointer text-sm font-semibold text-black dark:text-white",
                })
              }
            >
              Browse files
            </Button>
          </FileTrigger>
          <span
            slot="label"
            className="text-xs font-medium text-gray-400 dark:text-gray-500"
          >
            Or drag and drop it here
          </span>
        </div>
      </RACDropZone>
    </div>
  );
}
