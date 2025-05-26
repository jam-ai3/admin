import { Button } from "@/components/ui/button";
import { createIndividualCall, createUser } from "./_actions/db-test";
import { UsageChartCalls } from "./_components/usage-chart-calls";
import { getRecentUsers, getUsageData } from "./_actions/usage-functions";
import { IndividualCall, User } from "@prisma/client";
import { SectionCard, SectionTypeProps } from "./_components/section-card";
import { UsageChartUsers } from "./_components/usage-chart-users";

export type FormatedCallsProps = {
  date: string;
  type: string;
  totalCalls: number;
};

export type FormattedUsersProps = {
  date: string;
  totalUsers: number;
};

function formatCalls(calls: IndividualCall[]): FormatedCallsProps[] {
  const formatedCalls = calls.reduce((acc, call) => {
    const date = new Date(call.createdAt).toISOString().split("T")[0]; // "YYYY-MM-DD"
    const type = call.type;
    const key = `${date}|${type}`;
    if (!acc[key]) {
      acc[key] = 0;
    }
    if (!acc[`${date}|All`]) {
      acc[`${date}|All`] = 0;
    }
    acc[`${date}|All`] += 1;
    acc[key] += 1;

    return acc;
  }, {} as Record<string, number>);
  const chartReadyData: FormatedCallsProps[] = Object.entries(
    formatedCalls
  ).map(([key, totalCalls]) => ({
    type: key.split("|")[1],
    date: new Date(key.split("|")[0]).toISOString().split("T")[0],
    totalCalls,
  }));

  return chartReadyData;
}

function formatUsers(calls: User[]): FormattedUsersProps[] {
  const formattedUsers = calls.reduce((acc, call) => {
    const date = new Date(call.createdAt).toISOString().split("T")[0]; // "YYYY-MM-DD"
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {} as Record<string, number>);

  const chartReadyData: FormattedUsersProps[] = Object.entries(
    formattedUsers
  ).map(([key, totalUsers]) => ({
    date: new Date(key).toISOString().split("T")[0],
    totalUsers: totalUsers,
  }));
  return chartReadyData;
}

function getUserCardInfo(
  users: User[],
  numDays: number,
  description: string
): SectionTypeProps {
  const oneDayAgo = new Date(Date.now() - numDays * 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(Date.now() - numDays * 2 * 24 * 60 * 60 * 1000);
  const filteredOneDayAgo = users.filter((user) => user.createdAt > oneDayAgo);
  const filteredTwoDaysAgo = users.filter(
    (user) => user.createdAt > twoDaysAgo && user.createdAt < oneDayAgo
  );
  const percentage =
    filteredOneDayAgo.length === 0
      ? 0
      : ((filteredOneDayAgo.length - filteredTwoDaysAgo.length) /
          filteredTwoDaysAgo.length) *
        100;
  const uptread = percentage >= 0;

  return {
    title: "Total Users",
    bigNumber: filteredOneDayAgo.length,
    percentage: percentage.toFixed(1),
    description: description,
    uptrend: uptread,
  };
}

function getCallsCardInfo(
  calls: IndividualCall[],
  numDays: number,
  description: string
): SectionTypeProps {
  const oneDayAgo = new Date(Date.now() - numDays * 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(Date.now() - numDays * 2 * 24 * 60 * 60 * 1000);
  const filteredOneDayAgo = calls.filter((call) => call.createdAt > oneDayAgo);
  const filteredTwoDaysAgo = calls.filter(
    (call) => call.createdAt > twoDaysAgo && call.createdAt < oneDayAgo
  );
  const percentage =
    filteredOneDayAgo.length === 0
      ? 0
      : ((filteredOneDayAgo.length - filteredTwoDaysAgo.length) /
          filteredTwoDaysAgo.length) *
        100;
  const uptread = percentage >= 0;

  return {
    title: "Total Calls",
    bigNumber: filteredOneDayAgo.length,
    percentage: percentage.toFixed(1),
    description: description,
    uptrend: uptread,
  };
}

export default async function Home() {
  const calls = await getUsageData(90);
  const users = await getRecentUsers(90);
  const formatedCalls = await formatCalls(calls);
  const formatedUsers = await formatUsers(users);
  const userDailyCardInfo = getUserCardInfo(
    users,
    1,
    "User Sign ups in the Last Day"
  );
  const userWeeklyCardInfo = getUserCardInfo(
    users,
    7,
    "User Sign ups in the Last Week"
  );
  const callsDailyCardInfo = getCallsCardInfo(
    calls,
    1,
    "Number of Calls in the Last Day"
  );
  const callsWeeklyCardInfo = getCallsCardInfo(
    calls,
    7,
    "Number of Calls in the Last Week"
  );

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 px-4 sm:px-6 lg:px-8 w-full py-2 ">
      <div className="col-span-2 row-span-1">
        <div>
          {process.env.NODE_ENV === "development" && <ProductionButtons />}
        </div>
        <UsageChartCalls calls={formatedCalls} />
      </div>
      <div className="col-span-1 row-span-1">
        <UsageChartUsers calls={formatedUsers} />
      </div>
      <div className="col-span-1 row-span-1">
        <div className="grid grid-cols-2 grid-rows-2 gap-10">
          <div className="max-w-sm w-full">
            <SectionCard {...userDailyCardInfo}></SectionCard>
          </div>
          <div className="max-w-sm w-full">
            <SectionCard {...userWeeklyCardInfo}></SectionCard>
          </div>

          <div className="max-w-sm w-full">
            <SectionCard {...callsDailyCardInfo}></SectionCard>
          </div>
          <div className="max-w-sm w-full">
            <SectionCard {...callsWeeklyCardInfo}></SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductionButtons() {
  return (
    <div className="flex space-x-4 justify-end">
      <Button onClick={createUser}>Create Random User</Button>
      <Button onClick={createIndividualCall}>Create Random Call</Button>
    </div>
  );
}
