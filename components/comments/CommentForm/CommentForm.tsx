"use client";

import { Form } from "react-aria-components";

interface CommentFormProps {
  files: FileList | null;
  children?: React.ReactNode;
}

export function CommentForm({ files, children }: CommentFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //send form data to server
    //receive presigned urls for files upload
    //upload files to s3
  }

  return (
    <Form onSubmit={handleSubmit} className="flex w-full flex-col">
      {/*put file names to inputs*/}
      {children}
    </Form>
  );
}
