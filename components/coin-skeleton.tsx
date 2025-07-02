import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CoinSkeleton() {
  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
              <Skeleton className="h-4 w-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
            </div>
          </div>
          <Skeleton className="h-6 w-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
              <Skeleton className="h-4 w-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
            </div>
            <Skeleton className="h-6 w-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
              <Skeleton className="h-4 w-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
              <Skeleton className="h-4 w-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
              <Skeleton className="h-4 w-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}