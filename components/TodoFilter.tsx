'use client'

import { useStore } from "@/store"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

const TodoFilter = () => {
  const { filter, setFilter, completedCount, activeCount }: {
    filter: string,
    completedCount: () => number,
    activeCount: () => number,
    setFilter: (filter: string) => void
  } = useStore()
  const filters = [
    {
      key: 'all',
      label: 'All',
      count: activeCount() + completedCount()
    },
    {
      key: 'active',
      label: 'Active',
      count: activeCount()
    },
    {
      key: 'completed',
      label: 'Completed',
      count: completedCount()
    },
  ]
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {filters.map(({ count, key, label }) => (
              <Button
                key={key}
                variant={filter === key ? 'default' : 'outline'}
                size='sm'
                onClick={() => setFilter(key)}
                className="relative"
              >
                {label}
                {count > 0 &&
                  <span className="ml-2 bg-muted text-muted-foreground rounded-full px-2 py">
                    {count}
                  </span>
                }
              </Button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {activeCount()} active, {completedCount()} completed
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TodoFilter