"use client";

import { Button } from "@/components/ui/button";
import {
  getMessages,
  getReviews,
  getTotalMessagesCount,
  getTotalReviewsCount,
} from "./_actions/get-messages";
import MessageCard from "./_components/message-card";
import { createRandomFeedback, createRandomMessage } from "../_actions/db-test";
import { useEffect, useState } from "react";
import { Message, Review } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import PaginationFooter from "./_components/pagination-footer";
import { PAGE_LIMIT } from "./_actions/constants";
import ReviewCard from "./_components/review-card";

function calculateTotalPages(totalMessages: number) {
  return Math.ceil(totalMessages / PAGE_LIMIT);
}

export default function ContactInfoPage() {
  const searchParams = useSearchParams();
  const pageFromURL = Number(searchParams.get("page") || "1");

  const [page, setPage] = useState(pageFromURL);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [itemType, setItemType] = useState<"message" | "review">("message");
  async function fetchMessages() {
    setIsLoading(true);
    getMessages(page)
      .then(setMessages)
      .catch(() => setError(`Failed to load messages from page ${page}`))
      .finally(() => setIsLoading(false));
  }
  async function fetchReviews() {
    setIsLoading(true);
    getReviews()
      .then(setReviews)
      .catch(() => setError(`Filed to load reviews from page ${page}`))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    setPage(pageFromURL);
  }, [searchParams]);

  useEffect(() => {
    fetchMessages();
    fetchReviews();
  }, [page]);

  useEffect(() => {
    if (itemType === "review") {
      getTotalReviewsCount().then((count) => {
        setTotalPages(calculateTotalPages(count));
      });
    } else {
      getTotalMessagesCount().then((count) => {
        setTotalPages(calculateTotalPages(count));
      });
    }
  }, [itemType]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="grid grid-cols-2 gap-6">
      {process.env.NODE_ENV === "development" && <MeesageCreatorButton />}
      {process.env.NODE_ENV === "development" && <ReviewCreateButton />}
      <div className="flex col-span-2 justify-end gap-2">
        <Button
          onClick={() => {
            setItemType("review");
          }}
          variant={itemType === "review" ? "accent" : "outline"}
        >
          {" "}
          Review{" "}
        </Button>
        <Button
          onClick={() => {
            setItemType("message");
          }}
          variant={itemType === "message" ? "accent" : "outline"}
        >
          {" "}
          Messages
        </Button>
      </div>
      {error && <div>{error}</div>}
      {itemType === "review" ? (
        <ReviewData reviews={reviews} />
      ) : (
        <MessageData messages={messages} onRespond={fetchMessages} />
      )}
      <div className="col-span-2">
        <PaginationFooter currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}

function ReviewData({ reviews }: { reviews: Review[] }) {
  return (
    <>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </>
  );
}

type MessageDataProps = {
  messages: Message[];
  onRespond: () => void;
};

function MessageData({ messages, onRespond }: MessageDataProps) {
  return (
    <>
      {messages.map((message) => (
        <MessageCard key={message.id} message={message} onRespond={onRespond} />
      ))}
    </>
  );
}

function MeesageCreatorButton() {
  return <Button onClick={createRandomMessage}>Create Randomg Message</Button>;
}

function ReviewCreateButton() {
  return <Button onClick={createRandomFeedback}>Create Random Review</Button>;
}
