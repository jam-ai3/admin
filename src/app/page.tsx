import { Button } from "@/components/ui/button";
import { createIndividualCall, createUser } from "./_actions/db-test";
import { UsageChart } from "./_components/usage-chart";
import { getUsageData } from "./_actions/db-functions";
import { IndividualCall } from "@prisma/client";


export type FormatedCallsProps = {
  date: string
  type: string
  totalCalls: number
}

function formatCalls(calls: IndividualCall[]): FormatedCallsProps[] {

  const formatedCalls = calls.reduce((acc, call) => {
    const date = new Date(call.createdAt).toISOString().split("T")[0]; // "YYYY-MM-DD"
    const type = call.type
    const key = `${date}|${type}`
    if (!acc[key]) {
      acc[key] = 0
    }
    if (!acc[`${date}|All`]) {
      acc[`${date}|All`] = 0
    }
    acc[`${date}|All`] += 1
    acc[key] += 1

    return acc
  }, {} as Record<string, number>)
  const chartReadyData: FormatedCallsProps[] = Object.entries(formatedCalls).map(
    ([key, totalCalls]) => ({
      type: key.split("|")[1],
      date: new Date(key.split("|")[0]).toISOString().split("T")[0],
      totalCalls,
    })
  );



  return chartReadyData
}

export default async function Home() {
  const calls = await getUsageData(90)
  const formatedCalls = await formatCalls(calls)


  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full py-2 space-y-2">
      <div>
        {process.env.NODE_ENV === "development" && <ProductionButtons />}
      </div>
      <UsageChart calls={formatedCalls} />
    </div>
  );
}

function ProductionButtons() {

  return (
    <div className="flex space-x-4 justify-end">
      <Button onClick={createUser}>
        Create Random User
      </Button>
      <Button onClick={createIndividualCall}>
        Create Random Call
      </Button>
    </div>

  )
}
