import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export type SectionTypeProps = {
    title: string
    bigNumber: number
    percentage: string
    description: string
    uptrend: boolean
}

export function SectionCard({ title, bigNumber, percentage, description, uptrend}: SectionTypeProps) {
    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card className="@container/card">
                <CardHeader className="relative">
                    <CardDescription>{title}</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {bigNumber}
                    </CardTitle>
                    <div className="absolute right-4 top-4">
                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                            {uptrend ?
                                <div className="flex items-center gap-1">
                                    <TrendingUpIcon className="size-3" />
                                    +{percentage}%
                                </div>
                                :
                                <div className="flex items-center gap-1">
                                    <TrendingDownIcon className="size-3" />
                                    {percentage}%
                                </div>
                            }
                        </Badge>
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        { uptrend?
                        <div className="flex items-center gap-1">
                            Trending up this period<TrendingUpIcon className="size-4" />
                        </div>
                        :
                        <div className="flex items-center gap-1">
                            Trending down this period<TrendingDownIcon className="size-4" />
                        </div>}

                    </div>
                    <div className="text-muted-foreground">
                        {description}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
