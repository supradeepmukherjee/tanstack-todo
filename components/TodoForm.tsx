'use client'

import { useCreateTodo } from "@/hooks/useCreate"
import { createSchema } from "@/validations/todo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const TodoForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const createTodoMutation = useCreateTodo()
    const form = useForm({
        resolver: zodResolver(createSchema),
        defaultValues: {
            title: '',
            description: '',
            priority: 'medium'
        }
    })
    const onSubmit = async (data: object) => {
        try {
            const result = await createTodoMutation.mutateAsync(data)
            if (result.success) {
                toast.success('Todo created successfully')
                form.reset()
                setIsOpen(false)
            } else {
                toast.error(result.error)
            }
        } catch (err) {
            console.error(err)
            toast.error('Failed to create todo')
        }
    }
    if (!isOpen) return (
        <Button onClick={() => setIsOpen(true)} className='w-full mb-6' size='lg'>
            Add new todo
        </Button>
    )
    return (
        <Card className='mb-6'>
            <CardHeader>
                <CardTitle>
                    Create new todo
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <div className="">
                        <Label htmlFor='title'>
                            Title*
                        </Label>
                        <Input id='title' {...form.register('title')} placeholder='Enter title' />
                        {form.formState.errors.title && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.title.message}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <Label htmlFor='description'>
                            Description
                        </Label>
                        <Textarea id='description' {...form.register('description')} placeholder='Enter description(optional)' rows={3} />
                        {form.formState.errors.description && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <Label htmlFor='priority'>
                            Priority
                        </Label>
                        <Select value={form.watch('priority')} onValueChange={(val: 'low' | 'medium' | 'high') => form.setValue('priority', val)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='low'>
                                    Low
                                </SelectItem>
                                <SelectItem value='medium'>
                                    Medium
                                </SelectItem>
                                <SelectItem value='high'>
                                    High
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                            <Button type='submit' disabled={createTodoMutation.isPending}>
                                {createTodoMutation.isPending ? 'Creating...' : 'Create todo'}
                            </Button>
                            <Button type='button' variant='outline' onClick={()=>{
                                setIsOpen(false)
                                form.reset()
                            }}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default TodoForm