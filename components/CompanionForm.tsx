"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
	Field,
	FieldError,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
import { createCompanion } from "@/lib/actions/companions.actions"
import { redirect } from "next/navigation"

const formSchema = z.object({
	name: z.string().min(1, { message: 'Companion is required.'}),
	subject: z.string().min(1, { message: 'Subject is required.'}),
	topic: z.string().min(1, { message: 'Topic is required.'}),
	voice: z.string().min(1, { message: 'Voice is required.'}),
	style: z.string().min(1, { message: 'Style is required.'}),
	duration: z.number().min(1, { message: 'Duration is required.'}),
})

const CompanionForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			subject: '',
			topic: '',
			voice: '',
			style: '',
			duration: 15,
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const companion = await createCompanion(values);
		
		if(companion) {
			redirect(`/companions/${companion.id}`);
		} else {
			console.log('Failed to create a companion');
			redirect('/');
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<Controller
				name="name"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Companion name</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder="Enter the companion name"
							className="input"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="subject"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Subject</FieldLabel>
						<Select
							name={field.name}
							value={field.value}
							onValueChange={field.onChange}
						>
							<SelectTrigger
								id={field.name}
								aria-invalid={fieldState.invalid}
								className="input capitalize"
							>
								<SelectValue placeholder="Select the subject" />
							</SelectTrigger>
							<SelectContent>
								{subjects.map((subject) => (
									<SelectItem
										value={subject}
										key={subject}
										className="capitalize"
									>
										{subject}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="topic"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>What should the companion help with?</FieldLabel>
						<Textarea
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder="Ex. Derivates & Integrals"
							className="input"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="voice"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Voice</FieldLabel>
						<Select
							name={field.name}
							value={field.value}
							onValueChange={field.onChange}
						>
							<SelectTrigger
								id={field.name}
								aria-invalid={fieldState.invalid}
								className="input"
							>
								<SelectValue placeholder="Select the voice" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="male">Male</SelectItem>
								<SelectItem value="female">Female</SelectItem>
							</SelectContent>
						</Select>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="style"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Style</FieldLabel>
						<Select
							name={field.name}
							value={field.value}
							onValueChange={field.onChange}
						>
							<SelectTrigger
								id={field.name}
								aria-invalid={fieldState.invalid}
								className="input"
							>
								<SelectValue placeholder="Select the style" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="formal">Formal</SelectItem>
								<SelectItem value="casual">Casual</SelectItem>
							</SelectContent>
						</Select>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="duration"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Estimated session duration in minutes</FieldLabel>
						<Input
							{...field}
							id={field.name}
							type="number"
							value={field.value}
							onChange={(e) => field.onChange(e.target.valueAsNumber)}
							onBlur={field.onBlur}
							ref={field.ref}
							aria-invalid={fieldState.invalid}
							placeholder="15"
							className="input"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
		</form>
	)
}

export default CompanionForm
