"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Review } from "@prisma/client";

type RessageCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: RessageCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{review.userId}</CardTitle>
          <CardDescription>{review.message}</CardDescription>
        </CardHeader>
        <CardContent>{review.message}</CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
