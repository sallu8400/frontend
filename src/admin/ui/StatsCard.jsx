// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// export function StatsCard({ title, value, change, changeType, icon: Icon }) {
//   return (
//     <Card className="group relative overflow-hidden bg-gradient-to-br from-card to-card/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] border border-border/50">
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
//         <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
//           {title}
//         </CardTitle>
//         <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
//           <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
//         </div>
//       </CardHeader>
//       <CardContent className="relative z-10">
//         <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
//           {value}
//         </div>
//         <div className="flex items-center gap-1">
//           <span
//             className={cn(
//               "text-sm font-medium",
//               changeType === "positive" && "text-success",
//               changeType === "negative" && "text-destructive",
//               changeType === "neutral" && "text-muted-foreground"
//             )}
//           >
//             {change}
//           </span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }