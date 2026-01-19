import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { connectDb } from "@/lib/db";

export default async function Home() {
  await connectDb()
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Todo App
          </h1>
          <p className="text-muted-foreground">
            Built with Next.js, Tanstack Query, Zod & Mongoose
          </p>
        </header>
        <main>
          <TodoForm />
          <TodoFilter />
          <TodoList />
        </main>
      </div>
    </div>
  );
}
