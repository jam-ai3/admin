"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Message } from "@prisma/client";
import { messageResponded } from "../_actions/get-messages";
import { useState } from "react";
import { ACCENT_COLOR } from "@/lib/constants";

type MessageCardProps = {
  message: Message;
  onRespond: () => void;
};

export default function MessageCard({ message, onRespond }: MessageCardProps) {
  const [loading, setIsLoading] = useState(false);
  const [isResponded, setIsResponded] = useState(
    message.dateResponded !== null
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{message.name}</CardTitle>
          <CardDescription>{message.email}</CardDescription>
        </CardHeader>
        <CardContent>{message.message}</CardContent>
        <CardFooter>
          {!isResponded ? (
            <Button
              disabled={loading}
              onClick={() => {
                setIsLoading(true);
                messageResponded(message)
                  .then(onRespond)
                  .catch((error) => console.error(error))
                  .finally(() => {
                    setIsLoading(false);
                    setIsResponded(true);
                  });
              }}
            >
              {" "}
              {loading ? "Saving..." : "Answer Message"}{" "}
            </Button>
          ) : (
            <p style={{ color: ACCENT_COLOR }}> Saved As Responded!</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
