"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ACCENT_COLOR } from "@/lib/constants"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormatedCallsProps } from "../page"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    totalCalls: {
        label: "Total Calls",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


const CallTypes = [
    { value: "autocomplete", label: "Autocomplete" },
    { value: "shorten", label: "Shorten" },
    { value: "lengthen", label: "Lengthen" },
    { value: "grammar", label: "Grammar" },
    { value: "reorder", label: "Reorder" },
    { value: "All", label: "All" },
]




export function UsageChart({ calls }: { calls: FormatedCallsProps[] }) {
    const [timeRange, setTimeRange] = React.useState("90d")
    const [callType, setCallType] = React.useState("All")

    const filteredData = calls.filter((item) => {
        const date = new Date(item.date)
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysToSubtract);
        const inRange = date >= startDate
        const callTypeMatch = callType === item.type
        return inRange && callTypeMatch
    }) 


    return (
        <Card className="w-full justify-center">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Total User Usage</CardTitle>
                    <CardDescription>
                        Showing the total number of tool calls per day
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select value={callType} onValueChange={setCallType}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Call Types" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            CallTypes.map((item) => (
                                <SelectItem key={item.value} value={item.value} className="rounded-lg">
                                    {item.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex w-full px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            // tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fontSize: 12 }}

                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="totalCalls"
                            type="natural"
                            fill={ACCENT_COLOR}
                            stroke={ACCENT_COLOR}
                            stackId="a"
                            fillOpacity={0.3}
                        />

                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}