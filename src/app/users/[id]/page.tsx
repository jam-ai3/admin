import db from "@/db/db";

async function fetchUserData(id: string) {
  return await db.user.findUnique({
    select: {
      email: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
}

type UserPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const user = await fetchUserData(id);

  return (
    <div>
      <p>User {JSON.stringify(user)}</p>
    </div>
  );
}
