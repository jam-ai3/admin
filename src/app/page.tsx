import { Button } from "@/components/ui/button";
import { createIndividualCall, createUser } from "./_actions/db-test";
import { UsageChart } from "./_components/usage-chart";
import { getUsageData } from "./_actions/db-functions";
import { IndividualCall } from "@prisma/client";


export type formatedCallsProps = {
  date: string
  totalCalls: number
}

function formatCalls(calls: IndividualCall[]): formatedCallsProps[] {

  const formatedCalls = calls.reduce((acc, call) => {
    const date = new Date(call.createdAt).toISOString().split("T")[0]; // "YYYY-MM-DD"
    if (!acc[date]) {
      acc[date] = 0
    }

    acc[date] += 1

    return acc
  }, {} as Record<string, number>)
  const chartReadyData: formatedCallsProps[] = Object.entries(formatedCalls).map(
    ([date, totalCalls]) => ({
      date: new Date(date).toISOString().split("T")[0],
      totalCalls,
    })
  );



  return chartReadyData
}

export default async function Home() {
  const calls = await getUsageData(90)
  const formatedCalls = await formatCalls(calls)
  return (
    <>
      <div className="flex space-x-4">
        <Button onClick={createUser}>
          Create Random User
        </Button>
        <Button onClick={createIndividualCall}>
          Create Random Call
        </Button>
      </div>
      <UsageChart calls={formatedCalls} />
    </>
  );
}


