import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";

async function fetchUserData() {
  return await db.user.findMany({
    select: {
      email: true,
      createdAt: true,
      analytics: {
        select: {
          autocompleteCalls: true,
          shortenCalls: true,
          lengthenCalls: true,
          grammarCalls: true,
          reorderCalls: true,
        },
      },
    },
  });
}

export default async function UsersPage() {
  const users = await fetchUserData();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Sign Up Date</TableHead>
          <TableHead>Autocompletes</TableHead>
          <TableHead>Shortens</TableHead>
          <TableHead>Lengthens</TableHead>
          <TableHead>Grammars</TableHead>
          <TableHead>Reorders</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const analytics =
            user.analytics.length === 1 ? user.analytics[0] : null;
          return (
            <TableRow key={user.email}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt.toLocaleString()}</TableCell>
              <TableCell>{analytics?.autocompleteCalls ?? 0}</TableCell>
              <TableCell>{analytics?.shortenCalls ?? 0}</TableCell>
              <TableCell>{analytics?.lengthenCalls ?? 0}</TableCell>
              <TableCell>{analytics?.grammarCalls ?? 0}</TableCell>
              <TableCell>{analytics?.reorderCalls ?? 0}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
